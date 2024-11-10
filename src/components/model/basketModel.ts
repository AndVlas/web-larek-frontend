// Класс BasketModel, отвечает за хранение и работу с данными в корзине, полученных от пользователя

// Методы:
// - getCardCost — получает итоговую стоимость заказа
// - getCardAmount — считает количество товаров в корзине
// - addCard — добавляет карточку с товаром в корзину
// - deleteCard — убирает карточку с товаром из корзины

import { ICard } from '../../types/index';
import { IEvents } from '../base/events';

export interface IBasketModel {
    productIds: string[]; // Массив идентификаторов продуктов
    totalCost: number; // Стоимость корзины
}

export class BasketModel {
    protected _productIds: string[];
    protected _totalCost: number;

    constructor(protected events: IEvents) {
        this._productIds = [];
        this._totalCost = 0;
    }

    get productIds() {
        return this._productIds;
    }

    get totalCost() {
        return this._totalCost;
    }

    getCardCost() {
        return this.totalCost;
    }

    getCardAmount() {
        return this.productIds.length;
    }

    addCard(productId: string, productPrice: number) {
        this._productIds.push(productId);
        this._totalCost += productPrice; // Увеличиваем стоимость корзины
        this.events.emit('basket:change');
    }

    deleteCard(productId: string, productPrice: number) {
        const index = this._productIds.indexOf(productId);
        this._productIds.splice(index, 1);
        this._totalCost -= productPrice; // Уменьшаем стоимость корзины
        this.events.emit('basket:change');
    }

    clearList() {
        this._productIds = [];
        this._totalCost = 0;
    }
}