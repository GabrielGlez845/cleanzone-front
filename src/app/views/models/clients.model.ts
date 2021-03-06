import { UserTypes } from "./user-types.model";

export interface User {
    id:        number;
    name:      string;
    phone:     string;
    street:    string;
    suburb:    string;
    zip:       number;
    usertypeId:number;
    usertype?: UserTypes;
}


