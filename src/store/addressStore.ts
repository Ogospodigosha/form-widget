import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Dadata} from "../api/FormApiTypes";
import DadataAddrData = Dadata.DadataAddrData;


export interface useAddressStoreStateType {
    el: any
    setAddress: (el: any)=> void
}



const useCurrentItemStore = create(immer<useAddressStoreStateType>((set) => ({
    el: {},
    setAddress: (el: any) =>{
        set(state => {
            state.el = el
        })
    },

})))
export default useCurrentItemStore
