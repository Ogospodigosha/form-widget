import {useOutlet} from "react-router";

const ChangeAnketaLayout = () => {
    const outlet = useOutlet()

    return (
        <>
            {outlet}
        </>
    );
};

export default ChangeAnketaLayout;
