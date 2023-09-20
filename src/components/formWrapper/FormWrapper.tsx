import React, {FC} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CreditParameters} from "../CreditParameters/CreditParameters";


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
        <Router>
            <ThemeProvider currentTheme={currentTheme}>
                <Routes>
                    <Route path={'/'} element={<CreditParameters/>}/>
                </Routes>
            </ThemeProvider>
        </Router>

    );
};

export default FormWrapper;
