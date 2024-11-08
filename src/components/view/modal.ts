// Класс Modal, отвечает за отображение модальных окон

// Атрибуты:
// - button:HTMLButtonElement — кнопка закрытия модального окна
// - content:HTMLElement — содержимое модального окна
// - wrapper: HTMLElement — элемент оборачивающий страницу

// Методы:
// - open — открывает модульное окно
// - close — закрывает модульное окно
// - render — заменяет содержимое модального окна

import { IEvents } from "../base/events";

export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
  render(): HTMLElement;
}

export class Modal implements IModal {
  protected _button: HTMLButtonElement;
  protected _content: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(protected modalContainer: HTMLElement, protected events: IEvents) {
    this._button = modalContainer.querySelector('.modal__close') as HTMLButtonElement;
    this._content = modalContainer.querySelector('.modal__content') as HTMLElement;
    this._wrapper = document.querySelector('.page__wrapper') as HTMLElement;

    this._button.addEventListener('click', this.close.bind(this));
    this.modalContainer.addEventListener('click', this.close.bind(this));
    this.modalContainer.querySelector('.modal__container').addEventListener('click', (evt) => evt.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  set locked(value: boolean) {
    this._wrapper.classList.toggle('page__wrapper_locked', value);
  }

  open() {
    this.modalContainer.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.modalContainer.classList.remove('modal_active');
    this.events.emit('modal:close');
  }

  render(): HTMLElement {
    this.open();
    return this.modalContainer;
  }
}