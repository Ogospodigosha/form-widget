import {render} from "react-dom";
import FormWrapper from "./components/formWrapper/FormWrapper";
import {Theme} from "./theme/ThemeContext";


render(
    <FormWrapper currentTheme={'dark' as Theme}/>
    ,
    document.getElementById('root')
)
