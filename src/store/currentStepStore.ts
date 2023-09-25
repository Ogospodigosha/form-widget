import create from 'zustand'
import { immer } from 'zustand/middleware/immer'


export interface useCurrentStepType {
    step: number | null
    setCurrentStep: (step: number) => void
}



const useCurrentItemStore = create(immer<useCurrentStepType>((set) => ({
    step: null,
    setCurrentStep: (step: number) =>{
        set(state => {
            state.step = step
        })
    },


})))
export default useCurrentItemStore
