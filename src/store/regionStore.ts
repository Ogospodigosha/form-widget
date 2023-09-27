import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {Dadata} from "../api/FormApiTypes";



export interface useRegionStoreStateType {
    region: any
    setRegion: (region: any)=> void
}



const useRegionStore = create(immer<useRegionStoreStateType>((set) => ({
    region: {},
    setRegion: (region: any) =>{
        set(state => {
            state.region = region
        })
    },

})))
export default useRegionStore
