export const getValueForGender = (title: string) =>{
    switch (title) {
        case 'Мужской':
            return 'MALE'
        default:
            return  'FEMALE'
    }
}
