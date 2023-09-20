export declare type Nullable<T> = T | null
export type DataElement<T = string> = { value: Nullable<T>; title: string };
export type CreditProduct = 'credit_card' | 'credit_cash' | 'installment_card' | 'mfo' | 'hypothec' | 'car_credit'
export interface CreditCityType {
    id: string,
    name: string,
    subway: boolean,
    time_zone_offset: number,
}

export interface CreditParametersInfo extends Object {
    credit_target: Nullable<DataElement<string>>; //Выпадающий список - цель кредита
    credit_sum: Nullable<string>; //Сумма кредита - целое число
    credit_city: CreditCityType | null; //Город получения кредита
    name: Nullable<string>; //Имя
    surname: Nullable<string>; //Фамилия
    patronymic: Nullable<string>; //Отчество
    gender: Nullable<DataElement<string>>;
    email: Nullable<string>; //Email
    phone_number: Nullable<string>; //Номер телефона в формате (79991231212)
    deposit_car: Nullable<string>; //Первоначальный взнос
    checked: boolean;
    email_generated: boolean
}
