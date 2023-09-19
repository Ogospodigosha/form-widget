import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCurrentItemStoreStateType {
    creditTargetSelectItem: string
    genderSelectItem: string
    setGenderSelectItem: (genderSelectItem: string)=> void
    setCreditTargetSelectItem: (creditTargetSelectItem: string) => void
}



const useCurrentItemStore = create(immer<useCurrentItemStoreStateType>((set) => ({
    creditTargetSelectItem: '',
    genderSelectItem: '',
    setCreditTargetSelectItem: (creditTargetSelectItem: string) =>{
        set(state => {
            state.creditTargetSelectItem = creditTargetSelectItem
        })
    },
    setGenderSelectItem: (genderSelectItem: string) =>{
        set(state => {
            state.genderSelectItem = genderSelectItem
        })
    },

})))
export default useCurrentItemStore
