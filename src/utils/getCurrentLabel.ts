export const getCurrentLabel = (itemForSelect: string) =>{
    switch (itemForSelect) {
        case 'Кредитная карта':
            return 'Желаемый кредитный лимит, руб.'
        case 'Кредит наличными':
            return 'Сумма кредита, руб.'
        case 'Карта рассрочки':
            return 'Желаемый кредитный лимит, руб.'
        default:
            return 'Сумма кредита, руб.'
    }
}
