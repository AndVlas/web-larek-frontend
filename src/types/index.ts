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
    total: number;
    payment: string;
    address: string;
    email: string;
    phone: number;
}