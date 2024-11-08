// Класс Card, отвечает за отображение карточек с товарами

// Атрибуты:
// - cardTemplate: HTMLElement — шаблон карточки товара
// - category: HTMLElement — категория товара
// - title: HTMLElement — название товара
// - image: HTMLImageElement — иконка товара

// Методы:
// - setText — отрисовка текста товара
// - setPrice — отрисовка цены товара

import { IEvent, ICard } from '../../types';
import { IEvents } from "../base/events";

export interface ICardItem {
  render(data: ICard): HTMLElement
}

export class Card implements ICardItem {
  protected _cardTemplate: HTMLElement;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _categoryColors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }
  
  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IEvent) {
    this._cardTemplate = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this._category = this._cardTemplate.querySelector('.card__category');
    this._title = this._cardTemplate.querySelector('.card__title');
    this._image = this._cardTemplate.querySelector('.card__image');
    this._price = this._cardTemplate.querySelector('.card__price');
    
    if (actions?.onClick) {
      this._cardTemplate.addEventListener('click', actions.onClick);
    }
  }

  protected setText(element: HTMLElement, value: unknown): void {
    if (element) {
      element.textContent = String(value);
    }
  }

  set category(value: string) {
    this.setText(this._category, value);
    this._category.className = `card__category card__category_${this._categoryColors[value]}`
  }

  protected setPrice(value: number | null): string {
    return value === null ? 'Бесценно' : `${value} синапсов`;
  }

  render(data: ICard): HTMLElement {
    this._category.textContent = data.category;
    this.category = data.category;
    this._title.textContent = data.title;
    this._image.src = data.image;
    this._image.alt = this._title.textContent;
    this._price.textContent = this.setPrice(data.price);
    return this._cardTemplate;
  }
}