
export interface Product {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    pricings: Pricing[];
}


export interface Category {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Pricing {
    id:        number;
    price:     number;
    createdAt: Date;
    updatedAt: Date;
    productId: number;
    usertypeId: number;
}


export interface Usertype {
    id:   number;
    name: string;
    createdAt:  Date;
    updatedAt:  Date;
}
