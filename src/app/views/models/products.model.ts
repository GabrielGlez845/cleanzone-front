
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
    usertype?: Usertype;
}


export interface Usertype {
    id:   number;
    name: string;
    createdAt:  Date;
    updatedAt:  Date;
}
