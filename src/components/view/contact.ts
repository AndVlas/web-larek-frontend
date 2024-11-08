// Класс Contact, отвечает за отображение и приём данных в окне с контактными данными пользователя

// Атрибуты:
// - contactForm: HTMLFormElement — форма для контактных данных
// - submitButton: HTMLButtonElement — кнопка подтверждения
// - erorrsForm: HTMLElement — поле для вывода ошибок валидации

import { IEvents } from "../base/events";

export interface IContact {
    erorrsForm: HTMLElement;
    render(): HTMLElement;
  }
  
export class Contact implements IContact {
    protected _contactForm: HTMLFormElement;
    protected _submitButton: HTMLButtonElement;
    erorrsForm: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._contactForm = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this._submitButton = this._contactForm.querySelector('.contacts__button');
        this.erorrsForm = this._contactForm.querySelector('.form__errors');

        this._contactForm.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            if (target && target.classList.contains('form__input')) {
                const field = target.name;
                const value = target.value;
                this.events.emit(`contact:change`, { field, value });
            }
        });

        this._contactForm.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit('success:open');
        });
    }

    set valid(value: boolean) {
        this._submitButton.disabled = !value;
    }

    render() {
        return this._contactForm
    }
}