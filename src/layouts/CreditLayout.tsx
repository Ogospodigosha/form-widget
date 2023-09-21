import {useOutlet} from "react-router";
import useFormStepWatcher from "../customHooks/useFormStepWatcher";

const CreditLayout = () => {
    const outlet = useOutlet()


    useFormStepWatcher();

    return (
        <>
            {outlet}
        </>
    );
};

export default CreditLayout;
