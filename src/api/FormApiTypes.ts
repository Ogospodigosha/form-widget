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
export namespace Dadata {
    export interface DadataAddrResponse {
        suggestions: Array<Dadata.DadataAddrData>
    }

    export interface DadataAddrData {
        value: string
        unrestricted_value: string
        data: Dadata.AddrDataPropsType
    }

    export interface AddrDataPropsType {
        area: Nullable<string>
        area_fias_id: Nullable<string>
        area_kladr_id: Nullable<string>
        area_type: Nullable<string>
        area_type_full: Nullable<string>
        area_with_type: Nullable<string>
        beltway_distance: null
        beltway_hit: null
        block: Nullable<string>
        block_type: Nullable<string>
        block_type_full: Nullable<string>
        federal_district: Nullable<string>
        capital_marker: '0' | '1' | '2' | '3' | '4'
        city: Nullable<string>
        city_area: Nullable<string>
        city_district: Nullable<string>
        city_district_fias_id: Nullable<string>
        city_district_kladr_id: Nullable<string>
        city_district_type: Nullable<string>
        city_district_type_full: Nullable<string>
        city_district_with_type: Nullable<string>
        city_fias_id: Nullable<string>
        city_kladr_id: Nullable<string>
        city_type: Nullable<string>
        city_type_full: Nullable<string>
        city_with_type: Nullable<string>
        country: string
        country_iso_code: string
        fias_id: string
        fias_level: string
        flat: Nullable<string>
        flat_area: null
        flat_price: null
        flat_type: Nullable<string>
        flat_type_full: Nullable<string>
        geo_lat: Nullable<string>
        geo_lon: Nullable<string>
        geoname_id: Nullable<string>
        history_values: Nullable<Array<string>>
        house: Nullable<string>
        house_fias_id: Nullable<string>
        house_kladr_id: Nullable<string>
        house_type: Nullable<string>
        house_type_full: Nullable<string>
        kladr_id: Nullable<string>
        okato: Nullable<string>
        oktmo: Nullable<string>
        postal_box: Nullable<string>
        postal_code: Nullable<string>
        qc: null
        qc_complete: null
        qc_geo: Nullable<'0' | '1' | '2' | '3' | '4' | '5'>
        qc_house: null
        region: string
        region_fias_id: string
        region_kladr_id: string
        region_type: string
        region_type_full: string
        region_with_type: string
        settlement: Nullable<string>
        settlement_fias_id: Nullable<string>
        settlement_kladr_id: Nullable<string>
        settlement_type: Nullable<string>
        settlement_type_full: Nullable<string>
        settlement_with_type: Nullable<string>
        source: Nullable<string>
        square_meter_price: null
        street: Nullable<string>
        street_fias_id: Nullable<string>
        street_kladr_id: Nullable<string>
        street_type: Nullable<string>
        street_type_full: Nullable<string>
        street_with_type: Nullable<string>
        tax_office: Nullable<string>
        tax_office_legal: Nullable<string>
        timezone: Nullable<string>
        unparsed_parts: null
        fias_code: string
        region_iso_code: string
        fias_actuality_state: string
        metro: Nullable<Array<Dadata.MetroPropsType>>
    }

    export interface MetroPropsType {
        name: string
        line: string
        distance: number
    }

    export type AddrTypePropValue = 'region' | 'city' | 'street' | 'houses'

    export interface DadataAddrRequest {
        query: string
        from_bound?: { value: Dadata.AddrBoundsType }
        to_bound?: { value: Dadata.AddrBoundsType }
        locations?: Array<Dadata.AddrLocationsType>
        locations_boost?: Array<Dadata.AddrLocationsBoostType>
        count?: number
        language?: string
    }

    export type AddrBoundsType =
        'country'
        | 'region'
        | 'city'
        | 'street'
        | 'house'
        | 'settlement'
        | 'area'
        | ''

    export interface AddrLocationsBoostType {
        kladr_id: string
    }

    export interface AddrLocationsType {
        kladr_id?: string
        country_iso_code?: string
        region_iso_code?: string
        region_fias_id?: string //Ограничение по ФИАС-коду региона
        area_fias_id?: string //области
        city_fias_id?: string // города
        settlement_fias_id?: string //	населенного пункта
        street_fias_id?: string
        region?: string
        area?: string
        city?: string
        settlement?: string
        street?: string
        region_type_full?: string //	Ограничение по полному типу региона
        area_type_full?: string //	района в регионе
        city_type_full?: string //	города
        settlement_type_full?: string //	населенного пункта
        street_type_full?: string //улице
    }

    export interface DadataFIORequest {
        query: string
        count?: number
        gender?: string
        parts?: Array<Dadata.FioPartsType>
    }

    export type FioPartsType = 'NAME' | 'PATRONYMIC' | 'SURNAME'

    export interface DadataFIOResponse {
        suggestions: Array<Dadata.DadataFIOResponseData>
    }

    export interface DadataFIOResponseData {
        value: string
        unrestricted_value: string
        data: {
            gender: Dadata.GenderType
            name: Nullable<string>
            patronymic: Nullable<string>
            source: Nullable<string>
            surname: Nullable<string>
            qc: string
        }
    }

    export type GenderType = 'UNKNOWN' | 'MALE' | 'FEMALE'

    export interface DadataIssuedByPassportRequest {
        query: string
        filters?: [{
            region_code?: string
            type?: string
        }]
        count?: number
    }

    export interface DadataIssuedByPasportResponse {
        value: string
        unrestricted_value: string
        data: Dadata.DadataIssuedByPasportResponseData
    }

    export interface DadataIssuedByPasportResponseData {
        code: Nullable<string>
        name: Nullable<string>
        region_code: Nullable<string>
        type: Nullable<string>
    }

    export interface DadataEmailRequest {
        query: string
        count?: number
    }

    export interface DadataEmailResponse {
        value: string
        unrestricted_value: string
        data: Dadata.DadataEmailResponseData
    }

    export interface DadataEmailResponseData {
        local: Nullable<string>
        domain: Nullable<string>
        qc: Nullable<string>
        source: Nullable<string>
        type: Nullable<string>
    }

    export interface DadataCompanyInfoRequest {
        query: string
        count?: number
        locations_boost?: Array<Dadata.AddrLocationsBoostType>
        status?: ['ACTIVE']
    }

    export interface CompanyByInn {
        query: string
        count?: number
        kpp?: Nullable<string>
        branch_type?: CompanyBranch
        type?: CompanyType
    }

    export interface DadataCompanyInfoResponse {
        value: string
        unrestricted_value: string
        data: Dadata.DadataCompanyInfoResponseData
    }

    export interface DadataCompanyInfoResponseData {
        inn: Nullable<string> //ИНН
        kpp: Nullable<string> //КПП +
        ogrn: Nullable<string> //ОГРН
        ogrn_date: number //Дата выдачи ОГРН
        hid: Nullable<string> //Внутренний идентификатор внутри Дадата
        type: CompanyType //Тип организации Legal - юр лица, INDIVIDUAL - ИП
        name: Dadata.CompanyInfoNameInterface //Наименование организации
        fio: Dadata.IndividualFIOPropsType | undefined //Имя индивидуального предпринимателя
        okato: Nullable<string> //Код ОКАТО
        oktmo: Nullable<string> //Код ОКТМО
        okpo: Nullable<string> //Код ОКПО
        okogu: Nullable<string> //Код ОКОГУ
        okfs: Nullable<string> //Код ОКФС
        okved: Nullable<string> //Код ОКВЭД
        okved_type: CompanyOkvedType //Версия справочника ОКВЭД (2001/2014)
        opf: Dadata.CompanyInfoOPFType //Организационно - правовая форма
        management: Dadata.CompanyManagementInfoTypes | undefined //Инфо о руководителе (не ИП)
        branch_count: Nullable<number> //Количество филиалов
        address: Dadata.DadataAddrData //Адресс
        state: Dadata.CompanyInfoStateTypes //Состояние компании
        branch_type: CompanyBranch //Тип подразделения
        authorities: Nullable<CompanyAuthorities>
        capital: Nullable<CompanyCapital> | undefined
        documents: Nullable<CompanyDocuments>
        citizenship: Nullable<Citizenship>,
        emails: Nullable<Array<CompanyEmail>>
        employee_count: Nullable<number>
        finance: Nullable<CompanyFinances>
        founders: Nullable<CompanyFounders>
        licenses: LicenseInfo
        managers: Nullable<CompanyManagers>
        okveds: Nullable<CompanyOkveds>
        phones: Nullable<Array<CompanyPhone>>
        predecessors: PredecessorsSuccessors
        qc: null
        source: null
        successors: PredecessorsSuccessors
    }

    export interface CompanyCapital {
        type: string
        value: number
    }

    export type CompanyType = 'LEGAL' | 'INDIVIDUAL' | undefined
    export type CompanyBranch = 'MAIN' | 'BRANCH' | undefined
    export type CompanyOkvedType = '2014' | '2001' | undefined

    export interface CompanyDocuments {
        fts_registration: DocumentInterface
        pf_registration: DocumentInterface
        sif_registration: DocumentInterface
        smb: DocumentsSMB
    }

    export type PredecessorsSuccessors = Nullable<Array<Predecessors>>

    export interface Predecessors {
        ogrn: Nullable<string>,
        name: Nullable<string>,
        inn: Nullable<string>,
    }

    export interface Citizenship {
        code: {
            numeric: Nullable<string>,
            alpha_3: Nullable<string>,
        },
        name: {
            full: Nullable<string>,
            short: Nullable<string>,
        }
    }

    export type LicenseInfo = Nullable<Array<License>>

    export interface License {
        series: Nullable<string>
        number: Nullable<string>
        issue_date: Nullable<string>
        issue_authority: Nullable<string>
        suspend_date: Nullable<string>
        suspend_authority: Nullable<string>
        valid_from: Nullable<string>
        valid_to: Nullable<string>
        activities: Nullable<Array<any>>
        addresses: Nullable<Array<any>>
    }

    export interface CompanyPhone {
        value: string,
        unrestricted_value: string,
        data: {
            contact: Nullable<string>,
            source: Nullable<string>,
            qc: null,
            type: Nullable<string>,
            number: Nullable<string>,
            extension: null,
            provider: Nullable<string>,
            country: Nullable<string>,
            region: Nullable<string>,
            city: Nullable<string>,
            timezone: Nullable<string>,
            country_code: Nullable<string>,
            city_code: Nullable<string>,
            qc_conflict: null
        } | null
    }

    export interface CompanyEmail {
        value: Nullable<string>,
        unrestricted_value: Nullable<string>,
        data: {
            local: Nullable<string>,
            domain: Nullable<string>,
            type: Nullable<string>,
            source: Nullable<string>,
            qc: null
        }
    }

    export interface DocumentInterface {
        category?: Nullable<string>,
        type: Nullable<string>,
        series: Nullable<string>,
        number: Nullable<string>,
        issue_date: Nullable<string>,
        issue_authority: Nullable<string>
    }

    export interface DocumentsSMB {
        type: Nullable<string>,
        category: Nullable<string>,
        issue_date: Nullable<string>,
    }

    export interface CompanyFounder {
        ogrn: Nullable<string>,
        inn: Nullable<string>,
        name: Nullable<string>,
        hid: Nullable<string>,
        type: CompanyType,
        share: { value: Nullable<number>, type: Nullable<string>, numerator: Nullable<any>, denominator: Nullable<any> }
    }

    export interface CompanyFinance {
        tax_system: null,
        income: Nullable<number>,
        expense: Nullable<number>,
        debt: null,
        penalty: null,
        year: 2019
    }

    export interface CompanyOkved {
        main: boolean,
        type: CompanyOkvedType,
        code: Nullable<string>,
        name: Nullable<string>
    }

    export interface CompanyAuthorities {
        fts_registration: AuthoritiesProperties
        fts_report: AuthoritiesProperties
        pf: AuthoritiesProperties
        sif: AuthoritiesProperties
    }

    export interface AuthoritiesProperties {
        type: Nullable<string>
        code: Nullable<string>
        name: Nullable<string>
        address: Nullable<string>
    }


    export interface CompanyManager {
        inn: Nullable<string>,
        fio: {
            surname: string,
            name: string,
            patronymic: string,
            gender: GenderType,
            source: string,
            qc: null
        },
        post: Nullable<string>,
        hid: Nullable<string>,
        type: Nullable<string>
    }

    export type CompanyFounders = Array<CompanyFounder>
    export type CompanyManagers = Array<CompanyManager>
    export type CompanyOkveds = Array<CompanyOkved>
    export type CompanyFinances = Array<CompanyFinance>

    export interface CompanyInfoNameInterface {
        full_with_opf: Nullable<string>
        short_with_opf: Nullable<string>
        latin: Nullable<string>
        full: Nullable<string>
        short: Nullable<string>
    }

    export interface IndividualFIOPropsType {
        surname: Nullable<string>
        name: Nullable<string>
        patronymic: Nullable<string>
    }

    export interface CompanyInfoOPFType {
        type: '99' | '2012' | '2014' | undefined //Версия справочника ОКОПФ
        code: Nullable<string> //код ОКОПФ
        full: Nullable<string> //Полное название ОПФ
        short: Nullable<string> //Краткое название ОПФ
    }

    export interface CompanyManagementInfoTypes {
        name: Nullable<string>
        post: Nullable<string>
        disqualified: Nullable<any>
    }

    export interface CompanyInfoStateTypes {
        status: 'ACTIVE' | 'LIQUIDATING' | 'LIQUIDATED' | 'BANKRUPT' | 'REORGANIZING' | undefined //Статус компании
        code: null //детальный статус
        actuality_date: number //дата последних изменений
        registration_date: number //дата регистрации
        liquidation_date: Nullable<string> //дата ликвидации
    }
}
type ORG =
    Pick<Dadata.DadataCompanyInfoResponseData, Exclude<keyof Dadata.DadataCompanyInfoResponseData, 'address'>>
    & Object
export type EmploymentValues =
    'WORKACTIVITY.1'
    | 'WORKACTIVITY.2'
    | 'WORKACTIVITY.3'
    | 'WORKACTIVITY.4'
    | 'WORKACTIVITY.7'
export interface OrganizationData extends ORG {
    address: Address.Full
}
export type WorkActivityValues =
    'CLIENT.ACTIVITY.SCOPE.1'
    | 'CLIENT.ACTIVITY.SCOPE.2'
    | 'CLIENT.ACTIVITY.SCOPE.3'
    | 'CLIENT.ACTIVITY.SCOPE.4'
    | 'CLIENT.ACTIVITY.SCOPE.5'
    | 'CLIENT.ACTIVITY.SCOPE.6'
    | 'CLIENT.ACTIVITY.SCOPE.7'
    | 'CLIENT.ACTIVITY.SCOPE.8'
    | 'CLIENT.ACTIVITY.SCOPE.9'
    | 'CLIENT.ACTIVITY.SCOPE.11'
    | 'CLIENT.ACTIVITY.SCOPE.12'
    | 'CLIENT.ACTIVITY.SCOPE.14'
export interface WorkInfo extends Object {
    work: boolean | undefined
    employment_type: Nullable<DataElement<EmploymentValues>>; //Выпадающий список - тип занятости
    organization_info: OrganizationData | null; //Название организации - null в случае, если не работает.
    start_work: { date: 1; month: Nullable<DataElement>; year: Nullable<DataElement> } | null;
    company_type: Nullable<string>;
    activity: Nullable<DataElement>;
    work_address: Nullable<Address.Full>;
    expirience: Nullable<DataElement>;
    phone_work: Nullable<string>; //null в случае, если не работает.
    work_activity_type: Nullable<DataElement<WorkActivityValues>>
    job_title: Nullable<string>; //Название должности - null в случае, если собственный бизнес или не работает.
    job_type: Nullable<DataElement>; //Выпадюащий список - тип должности - null в случае, если собственный бизнес или не работает.
    monthly_income: Nullable<string>; //Ежемесячный доход
    why_is_has_not_work: Nullable<DataElement>; //Выпадающий список - почему отсутствует занятость, по умолчанию null - появляется в случае если человек не трудоустроен.
}
export type FormBehaviour = 'change' | 'create'
export type StepType = number
export interface AdditionalInfo extends Object {
    education: Nullable<DataElement>; //Выпадающий список - образование
    family_status: Nullable<DataElement>; //Выпадающий список - семейное положение
    children: Nullable<DataElement>; //Выпадающий список - дети до 18 лет
    having_car: Nullable<DataElement>; //Наличие автомобиля - выпадающий список
    having_real_estate: Nullable<DataElement>; //Наличие недвижимости - выпадающий список
    sms_code: Nullable<string>;
}
export interface PassportInfo extends Object {
    checked: boolean;
    date_birthday: Nullable<string>; //Дата рождения
    born_city: Nullable<string>;
    series_and_number: Nullable<string>; //Формат - "7400 123456" - серия и номер
    issued_date: Nullable<string>; //Дата получения
    department_code: Nullable<string>; //Формат "743-347" - код подразделения
    issued_by: Nullable<string>; //Кем выдан паспорт
    registration_address: Address.Full;
    registration_date: Nullable<string>; //Дата регистрации
    fact_address: Address.Full;
    contact_phone: Nullable<string>;
    contact_name: Nullable<string>;
    second_contact_phone: Nullable<string>,
    second_contact_name: Nullable<string>,
    secret_key: Nullable<string>
}
export interface ApplicationForm extends Object {
    behaviour: FormBehaviour;
    step: StepType;
    credit_parameters_info: CreditParametersInfo;
    work_info: WorkInfo;
    additional_info: AdditionalInfo;
    passport_info: PassportInfo;
    auth_info: Nullable<AuthInfo>;
    sendForm: SendFormIndicator;
    timer: TimerType;
    provider_data: boolean
}
export type TimerType = number
export type SendFormIndicator = boolean
export interface UserConfigType {
    user_agent: string,
    type: 'MTS_ID' | 'BASIC_SMS',
    screen_width: Nullable<number>,
    screen_height: Nullable<number>,
    opener: Nullable<string>,
    language: Nullable<string>,
    vendor: Nullable<string>,
    vendor_version: Nullable<string>,
    do_not_track: any,
    cookie_enabled: Nullable<boolean>
    address: Nullable<Address.Full>,
    sms_code: Nullable<string>
}
export interface AuthInfo extends UserConfigType {
    utm: {
        cid: Nullable<string>
        company: Nullable<string>
        frm: Nullable<string>
        mid: Nullable<string>
        source: Nullable<string>
    }
}
export namespace Address {
    export interface Full {
        full_address: Nullable<{ value: string }>
        region: Nullable<Address.Region>
        area: Nullable<Address.Area>
        city: Nullable<Address.City>
        settlement: Nullable<Address.Settlement>
        street: Nullable<Address.Street>
        house: Nullable<Address.House>
        flat: Nullable<Address.Flat>
    }

    export type Keys = Array<keyof Address.Region
        & keyof Address.Area
        & keyof Address.City
        & keyof Address.Settlement
        & keyof Address.Street
        & keyof Address.House
        & keyof Address.AddrRequiredFields>

    export interface AddrRequiredFields {
        postal_code: Nullable<string>
        fias_code: Nullable<string>
        fias_level: string;
        geo_lat: Nullable<string>
        geo_lon: Nullable<string>
        geoname_id: Nullable<string>
        qc_geo: '0' | '1' | '2' | '3' | '4' | '5' | null
        okato: Nullable<string>
        oktmo: Nullable<string>
        value: string
        list_value: string
    }

    export interface Region extends Address.AddrRequiredFields {
        region: Nullable<string>
        region_fias_id: Nullable<string>
        region_kladr_id: Nullable<string>
        region_type: Nullable<string>
        region_type_full: Nullable<string>
        region_with_type: Nullable<string>
        region_iso_code: Nullable<string>
    }

    export interface Area extends Address.AddrRequiredFields {
        area: Nullable<string>
        area_fias_id: Nullable<string>
        area_kladr_id: Nullable<string>
        area_type: Nullable<string>
        area_type_full: Nullable<string>
        area_with_type: Nullable<string>
    }

    export interface City extends Address.AddrRequiredFields {
        city: Nullable<string>
        city_area: Nullable<string>
        city_district: Nullable<string>
        city_district_fias_id: Nullable<string>
        city_district_kladr_id: Nullable<string>
        city_district_type: Nullable<string>
        city_district_type_full: Nullable<string>
        city_district_with_type: Nullable<string>
        city_fias_id: Nullable<string>
        city_kladr_id: Nullable<string>
        city_type: Nullable<string>
        city_type_full: Nullable<string>
        city_with_type: Nullable<string>
    }

    export interface Settlement extends Address.AddrRequiredFields {
        settlement: Nullable<string>
        settlement_fias_id: Nullable<string>
        settlement_kladr_id: Nullable<string>
        settlement_type: Nullable<string>
        settlement_type_full: Nullable<string>
        settlement_with_type: Nullable<string>
    }

    export interface Street extends Address.AddrRequiredFields {
        street: Nullable<string>
        street_fias_id: Nullable<string>
        street_kladr_id: Nullable<string>
        street_type: Nullable<string>
        street_type_full: Nullable<string>
        street_with_type: Nullable<string>
    }

    export interface House extends Address.AddrRequiredFields {
        house: Nullable<string>
        house_fias_id: Nullable<string>
        house_kladr_id: Nullable<string>
        house_type: Nullable<string>
        house_type_full: Nullable<string>
        block: Nullable<string>
        block_type: Nullable<string>
        block_type_full: Nullable<string>
    }

    export interface Flat extends Address.AddrRequiredFields {
        flat: Nullable<string>
        flat_area: null
        flat_price: null
        flat_type: Nullable<string>
        flat_type_full: Nullable<string>
    }
}
