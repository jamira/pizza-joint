export interface Pizza {
    id: number;
    name: string;
    ingredients: ToppingSelection[];
    price: number;
}

export interface Size {
    id: number;
    name: string;
    diameter: number;
    slices: number;
    price: number;
}

export interface Topping {
    id: number;
    name: string;
    price?: number;
}

export interface ToppingSelection {
    name: string;
    price: number
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    size: string;
    qty: number;
    toppings: ToppingSelection[];
}

export interface CartProps {
    cart: CartItem[];
    onClickCheckout?: () => void;
}

export interface CartItemProps {
    cart: CartItem;
    onRemove?: () => void;
}

export interface CartState {
    cartItems: CartItem[];
    isCheckout: boolean;
}

export interface PizzaProps {
    pizzas: Pizza[];
}

export interface PizzaCardProps {
    pizza: Pizza;
    buttonText: string;
    onButtonClick: () => void;
}

export interface PizzaCustomizationModalProps {
    show: boolean;
    title?: string;
    pizza: Pizza;
    onClose: () => void;
}