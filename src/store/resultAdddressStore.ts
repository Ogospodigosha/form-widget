import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Dadata} from "../api/FormApiTypes";



export interface useAddressStoreStateType {
    addressInStore: string[]
    setAddress: (addressInStore: string[])=> void
}



const useResultAddressStore = create(immer<useAddressStoreStateType>((set) => ({
    addressInStore: [],
    setAddress: (addressInStore: string[]) =>{
        set(state => {
            state.addressInStore = addressInStore
        })
    },

})))
export default useResultAddressStore
