export const getValueForCreditTarget =  (title: string) =>{
    switch (title) {
        case  'Кредитная карта':
            return 'credit_card'
        case  'Кредит наличными':
            return 'credit_cash'
        case  'Карта рассрочки':
            return 'installment_card'
        default:
            return 'mfo'
    }
}
