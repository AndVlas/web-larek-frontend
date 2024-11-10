// Класс Order, отвечает за отображение и приём данных в окне с выбором способа оплаты и вводом адреса доставки

// Атрибуты:
// - contactForm: HTMLFormElement — форма для адреса доставки
// - paymentSelection:HTMLButtonElement — выбранный метод оплаты
// - submitButton: HTMLButtonElement — кнопка подтверждения
// - altButtons: HTMLButtonElement[] — кнопки выбора метода оплаты
// - erorrsForm: HTMLElement — поле для вывода ошибок валидации

// Методы:
// - setPaymentSelection — отображает обводку кнопки метода оплаты

import { IEvents } from "../base/events";

export interface IOrder {
    errorsForm: HTMLElement;
    setPaymentSelection(button: HTMLButtonElement): void;
    render(): HTMLElement;
}

export class Order implements IOrder {
    protected _orderForm: HTMLFormElement;
    protected _paymentSelection: string;
    protected _submitButton: HTMLButtonElement;
    protected _altButtons: HTMLButtonElement[];
    errorsForm: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._orderForm = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this._submitButton = this._orderForm.querySelector('.order__button') as HTMLButtonElement;
        this._altButtons = Array.from(this._orderForm.querySelectorAll('.button_alt')) as HTMLButtonElement[];
        this.errorsForm = this._orderForm.querySelector('.form__errors') as HTMLElement;

        this._orderForm.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`order:change`, { field, value });
        });

        this._orderForm.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit('contact:open');
        });

        this._orderForm.addEventListener('click', (evt: Event) => {
            const target = evt.target as HTMLElement;
            if (target.classList.contains('button_alt') && target instanceof HTMLButtonElement) {
                this._paymentSelection = target.name;
                this.setPaymentSelection(target);
                this.events.emit('order:payment', target);
            }
        });
    }

    set valid(value: boolean) {
        this._submitButton.disabled = !value;
    }

    setPaymentSelection(button: HTMLButtonElement) {
        this._altButtons.forEach(item => item.classList.remove('button_alt-active'));
        button.classList.add('button_alt-active');
    }

    render() {
        return this._orderForm;
    }
}