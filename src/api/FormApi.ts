import {instance} from "./apiConfig";
import {CreditParametersInfo} from "./FormApiTypes";

export const FormApi ={
    async sendCreditParams(data: CreditParametersInfo) {
        return await instance.post<CreditParametersInfo>('api/form/create/credit_parameters_info', data)
    },
}
