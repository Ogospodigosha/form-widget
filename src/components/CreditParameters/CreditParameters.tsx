import React from 'react';
import {Container} from "../../ui/Container/Container";
import cls from "../formWrapper/FormWrapper.module.scss";
import {MySelect} from "../../ui/MySelect/MySelect";
import {Input} from "../../ui/Input/Input";
import {getCurrentLabel} from "../../utils/getCurrentLabel";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFormValues} from "../formWrapper/FormWrapper";
import {getValueForGender} from "../../utils/getValueForGender";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {useLocalStorageState} from "../../customHooks/useLocalStorage";
import {localStorageWrapper} from "../../utils/storage";
import {FormApi} from "../../api/FormApi";
import useFormStepWatcher from "../../customHooks/useFormStepWatcher";

export const CreditParameters = () => {
    const [titleLabel, setTitleLabel] = useLocalStorageState('titleLabel','')
    const [step, setStep] = useLocalStorageState('step', 0)
    const {handleSubmit, register, formState: {errors, touchedFields}, setValue} = useForm<IFormValues>({
        mode: "onBlur",
        // defaultValues: { credit_target: ''},
        reValidateMode: "onBlur"
    })
    const titleForLabel = (title: string) => {
        setTitleLabel(title)
    }
    const clickHandler = () => {
        setValue('credit_target', localStorageWrapper.get('credit_target') || 'Кредитная карта', {
            shouldValidate: false,
            shouldDirty: false, shouldTouch: false
        })
        setValue('gender', localStorageWrapper.get('gender') || 'Мужской', {
            shouldValidate: false,
            shouldDirty: false, shouldTouch: false
        })
    }

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        const newData = {
            ...data,
            gender: {title: data.gender, value: getValueForGender(data.gender)},
            credit_target: {title: data.credit_target, value: getValueForCreditTarget(data.credit_target)},
            email: `${localStorage.getItem('phoneNumberFromState')}@mail.ru`,
            credit_city: null,
            deposit_car: '',
            phone_number: localStorage.getItem('phoneNumberFromState'),
            checked: true,
            email_generated: true
        }

        await FormApi.sendCreditParams(newData).then(res => {
            // localStorage.setItem('step', '2')
            setStep(2)
        })
    }
    useFormStepWatcher()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                <Container cls={'wrapper-layout'}>
                    <div className={cls.FormTitle}>Заявка</div>
                    <MySelect placeholder={'Например: 700 000'}
                              name={'credit_target'}
                              label={'Выберите продукт'}
                              register={register}
                              errors={errors}
                              type={'number'}
                              titleForLabel={titleForLabel}
                              {...register("credit_target")}
                              option={Array({
                                  value: 'credit_card',
                                  title: 'Кредитная карта'
                              }, {value: 'credit_cash', title: 'Кредит наличными'}, {
                                  value: 'installment_card',
                                  title: 'Карта рассрочки'
                              }, {value: 'mfo', title: 'Кредит до 100 000 под 0%'})}
                    />
                    <Input  {...register("credit_sum", {required: true, min: 10000, max: 700000})}
                            placeholder={'Например: 700 000'}
                            label={getCurrentLabel(titleLabel)}
                            register={register}
                            errors={errors}
                            type={'number'}
                            textError={'Укажите сумму более 10000 руб.'}
                            status={errors.credit_sum === undefined && touchedFields.credit_sum ? true : undefined}
                    />
                </Container>
                <Container cls={'wrapper-layout'}>
                    <div className={cls.FormTitle}>Контактная информация</div>
                    <Input  {...register("surname", {required: true, pattern: /^[А-Яа-яЁё\s\-]+$/})}
                            placeholder={'Например: Иванов'}
                            label={'Ваша фамилия'}
                            register={register}
                            errors={errors}
                            type={'text'}
                            textError={'Укажите вашу фамилию. Допускаются: кириллица, пробел, дефис, тире'}
                            status={errors.surname === undefined && touchedFields.surname ? true : undefined}
                    />
                    <Input  {...register("name", {required: true, pattern: /^[А-Яа-яЁё\s\-]+$/})}
                            placeholder={'Например: Иван'}
                            label={'Ваше имя'}
                            register={register}
                            errors={errors}
                            type={'text'}
                            textError={'Укажите ваше имя. Допускаются: кириллица, пробел, дефис, тире'}
                            status={errors.name === undefined && touchedFields.name ? true : undefined}
                    />
                    <Input  {...register("patronymic", {required: true, pattern: /^[А-Яа-яЁё\s\-]+$/})}
                            placeholder={'Например: Иванович'}
                            label={'Ваше имя'}
                            register={register}
                            errors={errors}
                            type={'text'}
                            textError={'Укажите ваше отчество. Допускаются: кириллица, пробел, дефис, тире'}
                            status={errors.patronymic === undefined && touchedFields.patronymic ? true : undefined}
                    />
                    <MySelect placeholder={'Укажите ваш пол'}
                              name={'gender'}
                              label={'Пол'}
                              register={register}
                              errors={errors}
                              type={'number'}
                              {...register("gender")}
                              option={Array({value: 'FEMALE', title: 'Женский'}, {
                                  value: 'MALE',
                                  title: 'Мужской'
                              })}
                    />
                </Container>
                <div className={cls.BtnNext}>
                    <button type={'submit'} onClick={clickHandler}>Продолжить</button>
                </div>
            </div>
        </form>
    );
};

