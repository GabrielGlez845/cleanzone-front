import { Usertype } from './products.model';

export interface User {
    id:        number;
    name:      string;
    phone:     string;
    street:    string;
    suburb:    string;
    zip:       number;
    userTypeId:number;
    usertype?: Usertype;
    createdAt: Date;
    updatedAt: Date;
}


