interface Sizes {
    width: number,
    height: number
}
export interface Colors {
    primaryColor: string,
    greenColor: string,
    dangerColor: string,
    successColor: string,
    blueColor: string,
    blackColor: '#000',
    grayColor: string,
    sovbankColor: string,
    kkSovbankIconColor: string;
    kkSovbankColor: string;
    firstCreditColor: string,
    sovbankIconColor: string,
    whiteColor: string
}
interface IconsConfig {
    sizes: Sizes,
    colors: Colors
}
export const iconsConfig: IconsConfig = {
    sizes: {
        width: 40,
        height: 40,
    },
    colors: {
        primaryColor: 'rgba(242, 151, 39, 1)',
        greenColor: '#2AA745',
        dangerColor: '#E83038',
        successColor: '#0CA654',
        blueColor: 'rgba(3, 49, 140, 1)',
        blackColor: '#000',
        grayColor: '#6C6C6C',
        sovbankColor: '#56C7F5',
        kkSovbankIconColor: '#C2850F',
        kkSovbankColor: '#DA308B',
        firstCreditColor: '#66A5AD',
        sovbankIconColor: '#317EB0',
        whiteColor: '#ffffff'
    }
}
