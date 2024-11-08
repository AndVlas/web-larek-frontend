// Класс Success, отвечает за отображение окна успешного оформления заказа

// Атрибуты:
// - successModal: HTMLElement — шаблон модального окна успешной покупки
// - description: HTMLElement — текст модального окна успешной покупки
// - button:HTMLButtonElement — кнопка закрытия модального окна успешной покупки

import { IEvents } from "../base/events";

export interface ISuccess {
    render(total: number): HTMLElement;
}

export class Success {
    protected _successModal: HTMLElement;
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._successModal = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
        this._description = this._successModal.querySelector('.order-success__description');
        this._button = this._successModal.querySelector('.order-success__close');

        this._button.addEventListener('click', () => { events.emit('success:close') });
    }

    render(total: number) {
        this._description.textContent = `Списано ${total} синапсов`;
        return this._successModal
    }
}