import {render} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider";
import FormWrapper from "./components/FormWrapper";
import {Theme} from "./theme/ThemeContext";


render(
    <FormWrapper currentTheme={'dark' as Theme}/>
    ,
    document.getElementById('root')
)
