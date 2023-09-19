import React, {FC, useState} from 'react';
import {Theme} from "../../theme/ThemeContext";
import ThemeProvider from "../../theme/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import {Input} from "../../ui/Input/Input";
import { SubmitHandler, useForm} from "react-hook-form";
import {Container} from "../../ui/Container/Container";

import {MySelect} from "../../ui/MySelect/MySelect";
import useCurrentItemStore from "../../store/currentItemStore";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {getCurrentLabel} from "../../utils/getCurrentLabel";
import {getValueForGender} from "../../utils/getValueForGender";
import cls from './FormWrapper.module.scss'


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
    const creditTargetSelectItem = useCurrentItemStore(store => store.creditTargetSelectItem)
    const genderSelectItem = useCurrentItemStore(store => store.genderSelectItem)
    const {handleSubmit, register, formState:{errors, touchedFields},  setValue } = useForm<IFormValues>({
        mode: "onBlur",
        defaultValues: {credit_sum: '', credit_target: ''},
        reValidateMode:  "onBlur"
    })
    console.log(errors)
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        const newData = {...data, gender: {title: data.gender, value: getValueForGender(data.gender)}  ,credit_target: {title: data.credit_target, value: getValueForCreditTarget(data.credit_target)}}
            console.log(newData)

    }

    const clickHandler = () =>{
        setValue('credit_target', creditTargetSelectItem || 'Кредитная карта', {shouldValidate: false,
            shouldDirty: false, shouldTouch:false})
        setValue('gender', genderSelectItem || 'Мужской', {shouldValidate: false,
            shouldDirty: false, shouldTouch:false})
    }
    return (
        <BrowserRouter>
            <ThemeProvider currentTheme={currentTheme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                        <Container cls={'wrapper-layout'} >
                            <div className={cls.FormTitle}>Заявка</div>
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
                            <Input  {...register("credit_sum", {required: true, min:10000, max:700000  })}
                                    placeholder={'Например: 700 000'}
                                    label={getCurrentLabel(creditTargetSelectItem)}
                                    register={register}
                                    errors={errors}
                                    type={'number'}
                                    textError={'Укажите сумму более 10000 руб.'}
                                    status={errors.credit_sum === undefined && touchedFields.credit_sum   ? true : undefined}
                            />
                        </Container>
                        <Container cls={'wrapper-layout'}>
                            <div className={cls.FormTitle}>Контактная информация</div>
                            <Input  {...register("surname",{required: true, pattern: /^[А-Яа-яЁё\s\-]+$/ } )}
                                    placeholder={'Например: Иванов'}
                                    label={'Ваша фамилия'}
                                    register={register}
                                    errors={errors}
                                    type={'text'}
                                    textError={'Укажите вашу фамилию. Допускаются: кириллица, пробел, дефис, тире'}
                                    status={errors.surname === undefined && touchedFields.surname   ? true : undefined}
                            />
                            <Input  {...register("name",{required: true, pattern: /^[А-Яа-яЁё\s\-]+$/ } )}
                                    placeholder={'Например: Иван'}
                                    label={'Ваше имя'}
                                    register={register}
                                    errors={errors}
                                    type={'text'}
                                    textError={'Укажите ваше имя. Допускаются: кириллица, пробел, дефис, тире'}
                                    status={errors.name === undefined && touchedFields.name   ? true : undefined}
                            />
                            <Input  {...register("patronymic",{required: true, pattern: /^[А-Яа-яЁё\s\-]+$/ } )}
                                    placeholder={'Например: Иванович'}
                                    label={'Ваше имя'}
                                    register={register}
                                    errors={errors}
                                    type={'text'}
                                    textError={'Укажите ваше отчество. Допускаются: кириллица, пробел, дефис, тире'}
                                    status={errors.patronymic === undefined && touchedFields.patronymic   ? true : undefined}
                            />
                            <MySelect placeholder={'Укажите ваш пол'}
                                      name={'gender'}
                                      setValue={setValue}
                                      label={'Пол'}
                                      register={register}
                                      errors={errors}
                                      type={'number'}
                                      {...register("gender")}
                                      option={Array({value: 'FEMALE', title: 'Женский'},{value :'MALE', title: 'Мужской'} )}
                            />
                        </Container>
                        <div className={cls.BtnNext}>
                            <button  type={'submit'} onClick={clickHandler}>Продолжить</button>
                        </div>
                    </div>


                </form>
            </ThemeProvider>
        </BrowserRouter>

    );
};

export default FormWrapper;
