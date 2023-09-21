import React, {FC} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {CreditParameters} from "../CreditParameters/CreditParameters";
import {AuthWindowWrapper} from 'goshadostalo15package'
import Router from "../../router/Router";

type PropsType = {
    currentTheme: Theme
}

export interface IFormValues {
    credit_sum: string
    credit_target: string
    surname: string
    name: string
    patronymic: string
    gender: string
}

const FormWrapper: FC<PropsType> = ({currentTheme}) => {
    return (
        // <ThemeProvider currentTheme={currentTheme}>
        <BrowserRouter>

                {/*<Routes>*/}
                {/*    <Route path={'/'} element={<AuthWindowWrapper currentTheme={'dark' as any} backUrl={'https://develop.onbank.online'}/>}/>*/}
                {/*    <Route path={'/123'} element={<CreditParameters/>}/>*/}
                {/*</Routes>*/}
                <Router/>

        </BrowserRouter>
        // </ThemeProvider>

    );
};

export default FormWrapper;
