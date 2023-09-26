import axios, {AxiosResponse} from "axios";
import {SERVER_URL} from "./apiConfig";
import Cookies from "js-cookie";
import {Dadata} from "./FormApiTypes";

export const instanceDadata = axios.create({
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
    },
    baseURL: SERVER_URL + '/api/dadata/'
})
export const DadataApi = {
    apiPost: <T, D>(url: string, data: D): Promise<AxiosResponse<T>> => {
        return instanceDadata
            .post(url, JSON.stringify(data), {
                headers: {'Authorization': `Bearer ${Cookies.get('Bearer')}`}
            })
            .then((res) => res)
            .catch((err) => err)
    }
}
export const getAddressSuggestions = async (data: Dadata.DadataAddrRequest): Promise<Array<Dadata.DadataAddrData> | null> => {
    const response = await DadataApi.apiPost<Dadata.DadataAddrResponse, any>('get_address_suggestions', data)
    if (response.status === 200) {
        return response.data.suggestions
    } else {
        return null
    }
}
