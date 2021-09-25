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
    user?:      User; //no opcional
    employee?:  Employee; //no opcional
    details?:   Detail[]; //no opcional
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
  //  rows:       Row[];
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
    amount:    string;
    createdAt: Date;
    updatedAt: Date;
    serviceId: number;
}
