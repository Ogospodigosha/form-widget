import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCurrentItemStoreStateType {
    itemForSelect: string
    setItem: (itemForSelect: string) => void
}



const useCurrentItemStore = create(immer<useCurrentItemStoreStateType>((set) => ({
    itemForSelect: '',
    setItem: (itemForSelect: string) =>{
        set(state => {
            state.itemForSelect = itemForSelect
        })
    }

})))
export default useCurrentItemStore
