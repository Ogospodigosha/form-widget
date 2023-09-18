import React, {FC, useState} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import {Input} from "../../ui/Input/Input";
import { SubmitHandler, useForm} from "react-hook-form";
import {Container} from "../../ui/Container/Container";

import {MySelect} from "../../ui/MySelect/MySelect";
import useCurrentItemStore from "../../store/currentItemStore";


type PropsType = {
    currentTheme: Theme
}

export interface IFormValues {
    credit_sum: string
    test: string
    credit_target: string
}
const getValueForCreditTarget =  (title: string) =>{
    switch (title) {
        case  'Кредитная карта':
            return 'credit_card'
        case  'Кредит наличными':
            return 'credit_cash'
        case  'Карта рассрочки':
            return 'installment_card'
        default:
            return 'mfo'
    }
}
const FormWrapper: FC<PropsType> = ({currentTheme}) => {
    const itemForSelect = useCurrentItemStore(store => store.itemForSelect)
    const {handleSubmit, register, formState:{errors, touchedFields},  setValue } = useForm<IFormValues>({
        mode: "onBlur",
        defaultValues: {credit_sum: '', credit_target: ''}
    })
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        const newData = {...data, credit_target: {title: data.credit_target, value: getValueForCreditTarget(data.credit_target)}}
            console.log(newData)
        // console.log(data)
    }

    const clickHandler = () =>{
        setValue('credit_target', itemForSelect || 'Кредитная карта', {shouldValidate: false,
            shouldDirty: false, shouldTouch:false})
    }
    return (
        <BrowserRouter>
            <ThemeProvider currentTheme={currentTheme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                        <Container cls={'wrapper-layout'} id={'anketa-info'}>
                           <span>
                               <MySelect placeholder={'Например: 700 000'}
                                      name={'credit_target'}
                                      setValue={setValue}
                                      label={'Выберите продукт'}
                                      register={register}
                                      errors={errors}
                                      type={'number'}
                                      {...register("credit_target")}
                                   option={Array({value: 'credit_card', title: 'Кредитная карта'},{value :'credit_cash', title: 'Кредит наличными'}, {value: 'installment_card', title: 'Карта рассрочки'},{value:'mfo', title:'Кредит до 100 000 под 0%'} )}
                            />
                           </span>
                            <Input  {...register("test", {required: true, min:100, max:150  })}
                                    placeholder={'Например: 700 000'}
                                    label={'Сумма кредита, руб.'}
                                    register={register}
                                    errors={errors}
                                    type={'number'}
                                    textError={'Укажите сумму более 10000 руб.'}
                                    status={errors.test === undefined && touchedFields.test   ? true : undefined}
                            />
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
                    <button type={'submit'} onClick={clickHandler}>Send</button>
                </form>
            </ThemeProvider>
        </BrowserRouter>

    );
};

export default FormWrapper;
