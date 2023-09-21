import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {localStorageWrapper} from "../utils/storage";
import {getValueForCreditTarget} from "../utils/getValueForCreditTarget";

const useFormStepWatcher = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const step = Number(localStorage.getItem('step'));
    //const {creditProduct} = useZustandState(state => state.creditParams)
    const currentStep = {
        1: 'credit_parameters_info',
        2: 'work_info',
        3: 'additional_info',
        4: 'credit_parameters_info'
    }
    const creditProduct =getValueForCreditTarget(localStorageWrapper.get('credit_target'))  || 'credit_card'
    useEffect(() => {
        if (!step && pathname === '/') return navigate(`/credit/${creditProduct}/credit_parameters_info`);
        return navigate(`/credit/${creditProduct}/${currentStep[step]}`);
    }, [step, pathname, navigate]);
}

export default useFormStepWatcher;
