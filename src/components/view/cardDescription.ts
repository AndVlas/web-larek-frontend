// Класс CardDescription, наследуется от класса Card, отвечает за отображение данных расскрытых карточек

// Атрибуты:
// - description:HTMLElement — описание товара
// - button: HTMLElement — кнопка добавления товара в корзину

import { ICard, IEvent } from '../../types';
import { Card } from './card';
import { IEvents } from "../base/events";

export interface ICardDescription {
    render(data: ICard): HTMLElement;
  }

export class CardDescription extends Card implements ICardDescription {
    protected _description: HTMLElement
    protected _button: HTMLElement

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IEvent) {
        super(template, events, actions)
        this._description = this._cardTemplate.querySelector('.card__text');
        this._button = this._cardTemplate.querySelector('.button');

        this._button.addEventListener('click', () => { this.events.emit('basket:add') });
    }

    render(data: ICard): HTMLElement {
        this._category.textContent = data.category;
        this.category = data.category;
        this._title.textContent = data.title;
        this._image.src = data.image;
        this._image.alt = this._title.textContent;
        this._price.textContent = this.setPrice(data.price);
        this._description.textContent = data.description;
        this._button.textContent = 'Купить';
        return this._cardTemplate;
    }
}