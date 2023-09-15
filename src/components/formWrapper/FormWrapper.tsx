import React, {FC} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import {Input} from "../../ui/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";



type PropsType = {
    currentTheme: Theme
}

export interface IFormValues {
    name: string

}

const FormWrapper: FC<PropsType> = ({currentTheme}) => {
    const {handleSubmit, register} = useForm<IFormValues>()
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        console.log(data)
    }



    return (

        <BrowserRouter>
                <ThemeProvider currentTheme={currentTheme}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("name")} placeholder={'Например: 700 000'} />
                        <button>Send</button>
                    </form>
                </ThemeProvider>
        </BrowserRouter>

    );
};

export default FormWrapper;
