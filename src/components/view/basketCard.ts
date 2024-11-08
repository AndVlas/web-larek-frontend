// Класс BasketItem, отвечает за отображение товара в корзине

//  Атрибуты:
// - basketCardTemplate: HTMLElement — шаблон товара корзины
// - index: HTMLElement — порядковый номер товара
// - title: HTMLElement — название товара
// - price: HTMLElement — цена товара
// - deleteButton: HTMLButtonElement — кнопка удаления товара из корзины

// Методы:
// - setPrice — отображает цену товара

import { ICard } from "../../types";
import { IEvent } from "../../types";

export interface IBasketCard {
    render(data: ICard, index: number): HTMLElement;
};

export class BasketCard implements IBasketCard {
    protected _basketCard: HTMLElement;
    protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, actions?: IEvent) {
        this._basketCard = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
        this._index = this._basketCard.querySelector('.basket__item-index');
		this._title = this._basketCard.querySelector('.card__title');
		this._price = this._basketCard.querySelector('.card__price');
        this._deleteButton = this._basketCard.querySelector('.basket__item-delete');

        if (actions?.onClick) {
			this._deleteButton.addEventListener('click', actions.onClick);
		}
    }

    protected setPrice(price: number | null) {
        let result = (price === null) ? `Бесценно` : `${price} синапсов`
        return result;
    }

    render(data: ICard, index: number) {
        this._title.textContent = data.title;
        this._index.textContent = String(index)
        this._price.textContent = this.setPrice(data.price);
        return this._basketCard;
    }
}