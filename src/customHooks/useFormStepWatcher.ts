import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {localStorageWrapper} from "../utils/storage";
import {getValueForCreditTarget} from "../utils/getValueForCreditTarget";

const useFormStepWatcher = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    // const step = Number(localStorage.getItem('currentStep'));
    const step = Number(localStorage.getItem('currentStep'));
    //const {creditProduct} = useZustandState(state => state.creditParams)
    // @ts-ignore
    const creditProduct =getValueForCreditTarget(localStorageWrapper.get('credit_target'))  || 'credit_card'
    // @ts-ignore
    console.log(localStorageWrapper.get('credit_target'))
    console.log('!step', step)
    useEffect(() => {
        if (!step && pathname === '/') return navigate(`/credit/${creditProduct}/credit_parameters_info`);

        switch (step) {
            case 1: return navigate(`/credit/${creditProduct}/credit_parameters_info`);

            case 2: return navigate(`/credit/${creditProduct}/work_info`);

            case 3: return navigate(`/credit/${creditProduct}/additional_info`);

            case 4: return navigate(`/credit/${creditProduct}/passport_info`)

            default: return navigate(`/credit/${creditProduct}/credit_parameters_info`)
        }

    }, [step, pathname, navigate]);
}

export default useFormStepWatcher;
