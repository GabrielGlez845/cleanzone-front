import { Pricing } from './products.model';
export interface UserTypes {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    pricings?:  Pricing[];
}