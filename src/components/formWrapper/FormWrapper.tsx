import React, {FC, useEffect} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {CreditParameters} from "../CreditParameters/CreditParameters";
import {AuthWindowWrapper} from 'goshadostalo15package'
import Router from "../../router/Router";
import {FormApi} from "../../api/FormApi";
import {useLocalStorageState} from "../../customHooks/useLocalStorage";

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
    console.log('formWrapper render')
    const [step, setStep] = useLocalStorageState('step', 0)
    useEffect(()=>{
         FormApi.getApplication().then(({data})=>{
             setStep(data.step)
        })
    },[])
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
