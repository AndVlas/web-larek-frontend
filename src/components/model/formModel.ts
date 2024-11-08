// Класс FormModel, отвечает за хранение данных пользователей, полученных из формы заказа

// Методы:
// - setOrderAddress — получает и хранит адрес пользователя
// - validateOrderAdress — проверяет наличие адреса и выбранного метода оплаты
// - setOrderContacts — получает и хранит контактные данные пользователя
// - validateOrderContacts — проверяет наличие контактных данных пользователя
// - getOrder — возвращает заказ в виде объекта с данными пользователя и со списком преобретённых товаров

import { IEvents } from '../base/events';
import { FormErrors } from '../../types/index';

export interface IFormModel {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    setOrderAddress(field: string, value: string): void;
    validateOrderAdress(): boolean;
    setOrderContacts(field: string, value: string): void;
    validateOrderContacts(): boolean;
    getOrder(): object;
}

export class FormModel implements IFormModel {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    formErrors: FormErrors = {};

    constructor(protected events: IEvents) {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.total = 0;
        this.items = [];
    }

    setOrderAddress(field: string, value: string): void {
        if (field !== 'address') return;

        this.address = value;
        this.validateOrderAdress();
    }

    validateOrderAdress(): boolean {
        const regular = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
        const errors: FormErrors = {};

        if (!this.address || !regular.test(this.address)) {
            errors.address = !this.address ? 'Необходимо указать адрес' : 'Укажите настоящий адрес';
        }

        if (!this.payment) {
            errors.payment = 'Выберите способ оплаты';
        }

        this.formErrors = errors;
        this.events.emit('order:error', this.formErrors);
        if (Object.keys(errors).length === 0) {
            this.events.emit('order:ready', this.getOrder());
        }
        
        return Object.keys(errors).length === 0;
    }

    setOrderContacts(field: string, value: string): void {
        if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }

        this.validateOrderContacts();
    }

    validateOrderContacts(): boolean {
        const regularEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regularPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/;
        const errors: FormErrors = {};

        if (!this.email || !regularEmail.test(this.email)) {
            errors.email = !this.email ? 'Необходимо указать email' : 'Некорректный адрес электронной почты';
        }

        if (this.phone.startsWith('8')) {
            this.phone = '+7' + this.phone.slice(1);
        }

        if (!this.phone || !regularPhone.test(this.phone)) {
            errors.phone = !this.phone ? 'Необходимо указать телефон' : 'Некорректный формат номера телефона';
        }

        this.formErrors = errors;
        this.events.emit('contact:error', this.formErrors);
        if (Object.keys(errors).length === 0) {
            this.events.emit('order:ready', this.getOrder());
        }

        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.total,
            items: this.items,
        };
    }
}