import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ICard, IOrderForm } from './types/index';

import { ApiModel } from './components/model/apiModel';
import { CardModel } from './components/model/cardModel';
import { BasketModel } from './components/model/basketModel';
import { FormModel } from './components/model/formModel';

import { Card } from './components/view/card';
import { CardDescription } from './components/view/cardDescription';
import { Order } from './components/view/order';
import { Basket } from './components/view/basket';
import { BasketCard } from './components/view/basketCard';
import { Contact } from './components/view/contact';
import { Success } from './components/view/success';

import { Modal } from './components/view/modal';

const modalTemplate = document.querySelector('#modal-container') as HTMLTemplateElement;
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardItemTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const gallery = document.querySelector('.gallery');

const events = new EventEmitter();
const cardModel = new CardModel(events);
const apiModel = new ApiModel(CDN_URL, API_URL);
const basketModel = new BasketModel(events);
const formModel = new FormModel(events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(basketTemplate, events);
const order = new Order(orderTemplate, events);
const contact = new Contact(contactTemplate, events);
const success = new Success(successTemplate, events);


    // Получение товаров с сервера
apiModel.getCardList()
    .then(function (data: ICard[]) {
        cardModel.cards = data;
    })
    .catch(error => console.log(error))

    // Рендер карточек на главной странице
events.on('menu:render', () => {
    cardModel.cards.forEach(item => {
        const card = new Card(cardTemplate, events, {
            onClick: () => events.emit('card:select', item)
        });
        const itemElement = card.render(item);
        gallery.append(itemElement);
    });
});

    // Обработка выбранной карточки
events.on('card:select', (item: ICard) => {
    cardModel.getCardData(item);
});

    // Добавление карточки в корзину
events.on('basket:add', () => {
    basketModel.addCard(cardModel.selectedCard.id, cardModel.selectedCard.price);
    modal.close();
});

    // Удаление карточки из корзины
events.on('basket:remove', (item: ICard) => {
    basketModel.deleteCard(item.id, item.price);
});

    // Изменение корзины
events.on('basket:change', () => {
    basket.setBusketAmount(basketModel.getCardAmount());
    basket.setBusketCost(basketModel.getCardCost());
    let index = 0;
    basket.cards = basketModel.productIds.map((item) => {
        const cardData = cardModel.cards.find(card => card.id === item);
        const basketCard = new BasketCard(cardBasketTemplate, events, { onClick: () => events.emit('basket:remove', cardData) });
        index = index + 1;
        return basketCard.render(cardData, index);
    })
})

    // Открытие корзины
events.on('basket:open', () => {
    modal.content = basket.render ();
    modal.render();
});

    // Открытие описания карточки
events.on('card:open', (item: ICard) => {
    const cardDescription = new CardDescription(cardItemTemplate, events);
    modal.content = cardDescription.render(item);
    modal.render();
});

    // Открытие окна с данными заказа
events.on('order:open', () => {
    modal.content = order.render();
    modal.render();
    // formModel.items = basketModel.productIds;
    // console.log(formModel.items);
});

    // Обработка выбранного способа оплаты
events.on('order:payment', (button: HTMLButtonElement) => { 
    formModel.payment = button.name;
    order.setPaymentSelection(button);
});

    // Обработка данных, ведённых в полях формы
events.on(`order:change`, (data: { field: string, value: string }) => {
    formModel.setOrderAddress(data.field, data.value);
});

    // Обработка ошибок валидации
events.on('order:error', (errors: Partial<IOrderForm>) => {
    const { address, payment } = errors;
    order.valid = !address && !payment;
    order.errorsForm.textContent = Object.values({address, payment}).filter(i => !!i).join(', ');
})

    // Открытие окна с данными клиента
events.on('contact:open', () => {
    // formModel.total = basketModel.getCardCost();
    modal.content = contact.render();
    modal.render();
});

    // Обработка данных, ведённых в поля формы
events.on(`contact:change`, (data: { field: string, value: string }) => {
    formModel.setOrderContacts(data.field, data.value);
});

    // Обработка ошибок валидации
events.on('contact:error', (errors: Partial<IOrderForm>) => {
    const { email, phone } = errors;
    contact.valid = !email && !phone;
    contact.erorrsForm.textContent = Object.values({phone, email}).filter(i => !!i).join(', ');
})

    // Открытие окна успешной покупки и формирование заказа
events.on('order:send', () => {
    const order = formModel.getOrder()
    console.log(order);
    order.items = basketModel.productIds;
    order.total = basketModel.totalCost;
    console.log(order);
    apiModel.postOrder(order)
        .then((data) => {
            console.log(data);
            modal.content = success.render(order.total);
            basketModel.clearList();
            basket.setBusketAmount(basketModel.getCardAmount());
            basket.setBusketCost(basketModel.getCardCost());
            modal.render();
        })
        .catch(error => console.log(error));
});

    // Закрытие окна успешной покупки
events.on('success:close', () => modal.close());

    // Блокировка ползунка страницы
events.on('modal:open', () => {
    modal.locked = true;
});
    // Разблокировка ползунка страницы
events.on('modal:close', () => {
    modal.locked = false;
});