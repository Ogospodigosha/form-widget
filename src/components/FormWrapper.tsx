import React, {FC} from 'react';
import {Theme} from "../theme/ThemeContext";
import ThemeProvider from "../theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";


type PropsType = {
    currentTheme: Theme

}

const FormWrapper: FC<PropsType> = ({currentTheme}) => {
    return (

        <BrowserRouter>
            <ThemeProvider currentTheme={currentTheme}>
               <div>1231231</div>
            </ThemeProvider>
        </BrowserRouter>

    );
};

export default FormWrapper;
