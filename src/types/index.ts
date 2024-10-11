export interface IMenu {
    total: number;
    cards: string[];
}

export interface ICard {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number | null;
    description: string;
}

export interface IOrder {
    cards: string[];
    cost: number;
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IBusket extends IOrderForm {
    cards: string[];
}

export interface IOrderForm {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    cost?: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IEvent {
    onClick: (event: MouseEvent) => void;
}