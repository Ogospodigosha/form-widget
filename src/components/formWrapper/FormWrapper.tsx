import React, {FC} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import {Input} from "../../ui/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Container} from "../../ui/Container/Container";
import {Select} from "../../ui/Select/Select";


type PropsType = {
    currentTheme: Theme
}

export interface IFormValues {
    credit_sum: string
    Age: number
}

const FormWrapper: FC<PropsType> = ({currentTheme}) => {
    const {handleSubmit, register, formState:{errors, touchedFields}, getFieldState, getValues, } = useForm<IFormValues>({
        mode: "onBlur",
        defaultValues: {credit_sum: ''}
    })
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        console.log(data)
    }

    // console.log(touchedFields.credit_sum)
    console.log(getValues('credit_sum')) // можем получить значение на данный момент из инпута
    return (
        <BrowserRouter>
            <ThemeProvider currentTheme={currentTheme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                        <Container cls={'wrapper-layout'} id={'anketa-info'}>
                            <Select label="Age" {...register("Age")} />
                            <Input  {...register("credit_sum", {required: true, min:10000, max:700000  })}
                                    placeholder={'Например: 700 000'}
                                    label={'Сумма кредита, руб.'}
                                    register={register}
                                    errors={errors}
                                    type={'number'}
                                    textError={'Укажите сумму более 10000 руб.'}
                                    status={errors.credit_sum === undefined && touchedFields.credit_sum   ? true : undefined}
                            />
                        </Container>
                    </div>
                    <button>Send</button>
                </form>
            </ThemeProvider>
        </BrowserRouter>

    );
};

export default FormWrapper;
