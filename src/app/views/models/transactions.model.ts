export interface Transactions {
    id:        number;
    concept:   string;
    amount:    number;
    createdAt?: Date;
    updatedAt?: Date;
    accountId: number;
    account:   Account;
}

export interface Account {
    id:        number;
    name:      string;
    createdAt?: Date;
    updatedAt?: Date;
}