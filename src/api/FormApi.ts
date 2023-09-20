import {instance} from "./apiConfig";
import {ApplicationForm, CreditParametersInfo} from "./FormApiTypes";

export const FormApi ={
    async getApplication() {
        return await instance.get<ApplicationForm>('/api/form/get/current_test')
    },
    async sendCreditParams(data: CreditParametersInfo) {
        return await instance.post<CreditParametersInfo>('api/form/create/credit_parameters_info', data)
    },
}
