import { UserTypes } from './user-types.model';

export interface Product {
    id:        number;
    name:      string;
    category?: Category;
    categoryId?: number;
    pricings?: Pricing[];
}


export interface Category {
    id:        number;
    name:      string;
}

export interface Pricing {
    id:        number;
    price:     number;
    productId: number;
    usertypeId: number;
    usertype?: UserTypes;
    product?: Product;
}


