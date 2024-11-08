// Класс ApiModel, наследуется от класса Api, отвечает за получение и хранение данных с сервера

// Методы:
// - getCardList — получает массив с карточками товара
// - postOrder — хранит заказ пользователя

import { Api, ApiListResponse } from '../base/api';
import { ICard, IOrder, IOrderResult } from '../../types/index';

export interface IApiModel {
    cdn: string;
    items: ICard[];
    getCardList: () => Promise<ICard[]>;
    postOrder: (order: IOrder) => Promise<IOrderResult>;
}

export class ApiModel extends Api {
    cdn: string;
    items: ICard[];

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getCardList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
            }))
        );
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order).then((data: IOrderResult) => data);
    }
}