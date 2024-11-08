// Класс CardModel, отвечает за приём и хранение данных карточек товара

// Методы:
// - getCardData — получает данные карточки с товаром, которую открыл пользователь

import { ICard } from '../../types/index';
import { IEvents } from '../base/events';

export interface ICardModel {
  cards: ICard[];
  selectedCard: ICard;
  getCardData(item: ICard): void;
}

export class CardModel implements ICardModel {
  protected _cards: ICard[];
  selectedCard: ICard;

  constructor(protected events: IEvents) {
    this._cards = [];
  }

  set cards(data: ICard[]) {
    this._cards = data;
    this.events.emit('menu:render');
  }

  get cards() {
    return this._cards;
  }

  getCardData(item: ICard) {
    this.selectedCard = item;
    this.events.emit('card:open', item);
  }
}