import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {localStorageWrapper} from "../utils/storage";
import {getValueForCreditTarget} from "../utils/getValueForCreditTarget";
import useCurrentItemStore from "../store/currentStepStore";

const useFormStepWatcher = () => {
    const step = Number(localStorage.getItem('step'));
    const currentStep =   useCurrentItemStore(store => store.step)
    console.log('step', step)
    const navigate = useNavigate();
    const {pathname} = useLocation();
    // localStorage.setItem('step', '2')

    //const {creditProduct} = useZustandState(state => state.creditParams)
    // const currentStep: Record<number, string> = {
    //     1: 'credit_parameters_info',
    //     2: 'work_info',
    //     3: 'additional_info',
    //     4: 'credit_parameters_info'
    // }

    const creditProduct =getValueForCreditTarget(localStorageWrapper.get('credit_target'))  || 'credit_card'
    useEffect(() => {
        if (!step && pathname === '/') return navigate(`/credit/${creditProduct}/credit_parameters_info`);
        switch (step ) {
            case 1: return navigate(`/credit/${creditProduct}/credit_parameters_info`)
            case 2: return navigate(`/credit/${creditProduct}/work_info`)
        }

        // return navigate(`/credit/${creditProduct}/${currentStep[step]}`);
    }, [step, pathname, navigate, currentStep]);

}

export default useFormStepWatcher;
