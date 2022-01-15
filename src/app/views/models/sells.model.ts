import { User } from './clients.model';
import { Product } from './products.model';

/*export interface Welcome {
    ok:   boolean;
    data: Sells[];
}*/

export interface Service {
    id:        number;
    state:     number;
    userId: number;
    employeeId? :number;
    user?:      User;
    employee?:  Employee; 
    createdAt?: Date;
    details?:   Detail[]; 
    payments?: Payment[];
}
export interface Detail {
    id:         number;
    identifier: number;
    ticket:     string;
    status:     number;
    serviceId:  number;
    createdAt?: Date;
    observation?: string;
    rows?:       Row[];
}

export interface Row {
    id:           number;
    quantity:     number;
    observations: string;
    colors:       string;
    status:       number;
    detailId:     number;
    productId:    number;
    product:    Product;
}

export interface Employee {
    id:        number;
    name:      string;
    email:      string;
    password?:   string;
    createdAt: Date;
    updatedAt: Date;
    role?:     Role;
    roleId?:     number;
}

export interface Role {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}


export interface Payment {
    id:            number;
    amount:        number;
    createdAt?:     Date;
    updatedAt?:     Date;
    serviceId:     number;
    transactionId?: number;
    transaction?:   Transaction;
}

export interface Transaction {
    id:        number;
    concept:   string;
    amount:    number;
    createdAt?: Date;
    updatedAt?: Date;
    accountId: number;
}