
export interface Product {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
    categoryId?: number;
    pricings?: Pricing[];
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
    usertype?: Usertype;
}


export interface Usertype {
    id:   number;
    name: string;
    createdAt:  Date;
    updatedAt:  Date;
}
