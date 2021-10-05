import { User } from './clients.model';
import { Product } from './products.model';

/*export interface Welcome {
    ok:   boolean;
    data: Sells[];
}*/

export interface Service {
    id:        number;
    state:     number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    employeeId? :number;
    user?:      User;
    employee?:  Employee; 
    details?:   Detail[]; 
    payments?: Payment;
}
export interface Detail {
    id:         number;
    identifier: number;
    ticket:     string;
    status:     number;
    createdAt:  Date;
    updatedAt:  Date;
    serviceId:  number;
    observation?: string;
    rows?:       Row[];
}

export interface Row {
    id:           number;
    quantity:     number;
    observations: string;
    colors:       string;
    status:       number;
    createdAt:    Date;
    updatedAt:    Date;
    detailId:     number;
    productId:    number;
    product:    Product;
}

export interface Employee {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    role:     Role;
}

export interface Role {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payment {
    id:        number;
    amount:    number;
    createdAt: Date;
    updatedAt: Date;
    serviceId: number;
}
