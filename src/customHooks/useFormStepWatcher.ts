import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

const useFormStepWatcher = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    debugger
    const step = undefined
    //const {creditProduct} = useZustandState(state => state.creditParams)
    const creditProduct = 'credit_card'
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
