
export interface PaymentCC {
    id:            number;
    amount:        number;
    createdAt:     Date;
    updatedAt:     Date;
    serviceId:     number;
    transactionId: number;
    service:       ServiceCC;
    transaction:   TransactionCC;
}

export interface ServiceCC {
    id:         number;
    state:      number;
    createdAt:  Date;
    updatedAt:  Date;
    userId:     number;
    employeeId: number;
    employee:   EmployeeCC;
}

export interface EmployeeCC {
    id:        number;
    name:      string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    roleId:    number;
}


export interface TransactionCC {
    id:        number;
    concept:   string;
    amount:    number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
}

