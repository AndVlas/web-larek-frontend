// Класс BasketModel, отвечает за хранение и работу с данными в корзине, полученных от пользователя

// Методы:
// - getCardCost — получает итоговую стоимость заказа
// - getCardAmount — считает количество товаров в корзине
// - addCard — добавляет карточку с товаром в корзину
// - deleteCard — убирает карточку с товаром из корзины

import { ICard } from '../../types/index';
import { IEvents } from '../base/events';

export interface IBasketModel {
    basketList: ICard[];
}

export class BasketModel {
    protected _basketList: ICard[];

    constructor(protected events: IEvents) {
        this._basketList = [];
    }

    set basketList(data: ICard[]) {
        this._basketList = data;
    }

    get basketList() {
        return this._basketList;
    }

    getCardCost() {
        let cost = 0;
        this.basketList.forEach(item => {
            cost = cost + item.price;
        });
        return cost;
    }

    getCardAmount() {
        return this.basketList.length;
    }

    addCard(data: ICard) {
        this._basketList.push(data);
    }

    deleteCard(data: ICard) {
        const index = this._basketList.indexOf(data);
        this._basketList.splice(index, 1);
    }
}