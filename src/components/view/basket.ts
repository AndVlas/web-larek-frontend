// Класс Basket, отвечает за отображение корзины

// Атрибуты:
// - basketTemplate: HTMLElement — шаблон модального окна корзины
// - headerButton: HTMLButtonElement — кнопка корзины в меню
// - headerButtonIndex: HTMLElement — счётчик количества товара в корзине
// - basketButton: HTMLButtonElement — кнопка оформления заказа
// - basketList: HTMLElement — список товаров в корзине
// - basketCost: HTMLElement — стоимость заказа

// Методы:
// - setBusketAmount — отображает количество товаров в корзине
// - setBusketCost — отображает итоговую стоимость заказа

import { IEvents } from "../base/events";

export interface IFormBasket {
    setBusketAmount(amount: number): void
    setBusketCost(cost: number): void
    render(): HTMLElement;
}

export class Basket implements IFormBasket {
    protected _basketTemplate: HTMLElement;
    protected _headerButton: HTMLButtonElement;
    protected _headerButtonIndex: HTMLElement;
    protected _basketButton: HTMLButtonElement;
    protected _basketList: HTMLElement;
    protected _basketCost: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._basketTemplate = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
        this._headerButton = document.querySelector('.header__basket') as HTMLButtonElement;
        this._headerButtonIndex = this._headerButton.querySelector('.header__basket-counter') as HTMLElement;
        this._basketButton = this._basketTemplate.querySelector('.basket__button') as HTMLButtonElement;
        this._basketList = this._basketTemplate.querySelector('.basket__list') as HTMLElement;
        this._basketCost = this._basketTemplate.querySelector('.basket__price') as HTMLElement;

        this._headerButton.addEventListener('click', () => this.events.emit('basket:open'));
        this._basketButton.addEventListener('click', () => this.events.emit('order:open'));
    }

    set cards(cards: HTMLElement[]) {
        this._basketList.innerHTML = '';
        if (cards.length > 0) {
            this._basketList.append(...cards);
            this._basketButton.removeAttribute('disabled');
        } else {
            this._basketButton.setAttribute('disabled', 'disabled');
        }
    }

    setBusketAmount(amount: number) {
        this._headerButtonIndex.textContent = `${amount}`;
    }

    setBusketCost(cost: number) {
        this._basketCost.textContent = `${cost} синапсов`;
    }

    render() {
        return this._basketTemplate
    }
}