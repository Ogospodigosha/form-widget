import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {localStorageWrapper} from "../utils/storage";
import {getValueForCreditTarget} from "../utils/getValueForCreditTarget";

const useFormStepWatcher = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const step = Number(localStorage.getItem('step'));
    //const {creditProduct} = useZustandState(state => state.creditParams)

    const creditProduct =getValueForCreditTarget(localStorageWrapper.get('credit_target'))  || 'credit_card'
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
