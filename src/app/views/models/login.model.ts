import { Role } from './sells.model';
export interface LoginPost {
    email:      string;
    password:     string;
}

export interface resp {
    ok:      boolean;
    data:     any;
}

export interface LoginGet {
    ok:    boolean;
    data:  Login;
    token: string;
}

export interface Login {
    id:        number;
    name:      string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    role:      Role;
    roleId:    number;
}