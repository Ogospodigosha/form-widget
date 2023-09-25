import {useOutlet} from "react-router";
import useFormStepWatcher from "../customHooks/useFormStepWatcher";

const CreditLayout = () => {
    const outlet = useOutlet()
    console.log('layout render')

    useFormStepWatcher();

    return (
        <>
            {outlet}
        </>
    );
};

export default CreditLayout;
