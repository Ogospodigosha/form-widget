import React from 'react';
import {Container} from "../../ui/Container/Container";
import {Button, ThemeButton} from "../../ui/Button/Button";
import {useNavigate} from "react-router";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {localStorageWrapper} from "../../utils/storage";
import cls from './WorkInfoEmployment.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {DadataInput} from "../../ui/DadataInput/DadataInput";


export type IFormValuesWork = {
    value: string
}

const WorkInfoEmployment = () => {
    const {handleSubmit, register, formState: {errors, touchedFields}, setError,setValue} = useForm<IFormValuesWork>({
        mode: "onBlur",
        reValidateMode: "onBlur"
    })
    const navigate = useNavigate()
    const creditProduct = getValueForCreditTarget(localStorageWrapper.get('credit_target')) || 'credit_card'
    const goBack = () => {
        localStorage.setItem('step', '2.1')
        navigate(`/credit/${creditProduct}/work_info/work`)
    }
    const onSubmit: SubmitHandler<IFormValuesWork> = async (data) => {
        console.log(data)
    }
    const hasCity = () =>{
        return  !!localStorage.getItem('click')
    }
    const clickHandler = () =>{
        setValue('value', localStorageWrapper.get('value') || '', {
            shouldValidate: false,
            shouldDirty: false, shouldTouch: false
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                <Container cls={'wrapper-layout'}>
                    <div className={cls.header}>
                        <div>Рабочий адрес</div>
                    </div>
                    <DadataInput  {...register("value", {required: true, validate: hasCity})}
                                  placeholder={'Например: Москва Ленина д 2 кв 1 '}
                                  label={'Введите адрес в поле ниже и\n' +
                                      'выберите подходящий из списка'}
                                  register={register}
                                  setError={setError}
                                  errors={errors}
                                  type={'text'}
                                  textError={'Укажите город и выберите его из выпадающего списка'}
                                  status={errors.value === undefined && touchedFields.value ? true : undefined}
                    />

                </Container>
                <div style={{padding: '0 24px'}}>
                    <Button theme={ThemeButton.STANDARD} onClick={goBack}>Назад</Button>
                    <button type={'submit'} onClick={clickHandler}>Продолжить</button>
                </div>
            </div>
        </form>
    );
};

export default WorkInfoEmployment;
