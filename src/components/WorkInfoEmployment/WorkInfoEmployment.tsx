import React, {useEffect} from 'react';
import {Container} from "../../ui/Container/Container";
import {Button, ThemeButton} from "../../ui/Button/Button";
import {useNavigate} from "react-router";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {localStorageWrapper} from "../../utils/storage";
import cls from './WorkInfoEmployment.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {DadataInput} from "../../ui/DadataInput/DadataInput";
import useResultAddressStore from "../../store/resultAdddressStore";




export type IFormValuesWork = {
    region: string
    city: string
}

const WorkInfoEmployment = () => {
    const {
        handleSubmit,
        register,
        formState: {errors, touchedFields},
        setError,
        setValue,
        trigger,
        getValues,
        reset,
        resetField
    } = useForm<IFormValuesWork>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            region: localStorage.getItem('resultAddress')? localStorageWrapper.get('resultAddress')[0] : '',
            city:localStorage.getItem('resultAddress')? localStorageWrapper.get('resultAddress')[1] : '',
        }
    })
    const {setAddress, addressInStore} = useResultAddressStore()
    useEffect(()=>{
         // предыдущее значение
        if (localStorageWrapper.get('resultAddress') ) {

            setValue('region', localStorageWrapper.get('resultAddress')[0] || '', {
                shouldValidate: false,
                shouldDirty: false, shouldTouch: false
            })

            localStorageWrapper.set('region', localStorageWrapper.get('resultAddress')[0])

            setValue('city', localStorageWrapper.get('resultAddress')[1] || '', {
                shouldValidate: false,
                shouldDirty: false, shouldTouch: false
            })
            localStorageWrapper.set('city', localStorageWrapper.get('resultAddress')[1])
        }
    },[localStorageWrapper.get('resultAddress')])

    const navigate = useNavigate()
    const creditProduct = getValueForCreditTarget(localStorageWrapper.get('credit_target')) || 'credit_card'
    const goBack = () => {
        localStorage.setItem('step', '2.1')
        navigate(`/credit/${creditProduct}/work_info/work`)
    }
    const onSubmit: SubmitHandler<IFormValuesWork> = async (data) => {
        const newData = {
            work_address: {
                region: localStorageWrapper.get('regionData'),
                city: localStorageWrapper.get('cityData')
            }
        }
        console.log(newData)
    }

    const clickHandler = () => {
        setValue('region', localStorageWrapper.get('region') || '', {
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
                    <DadataInput  {...register("region")}
                                  defaultValue={addressInStore[0]}
                                  getValues={getValues}
                                  placeholder={'Например: Москва Ленина д 2 кв 1 '}
                                  name={'region'}
                                  label={'Введите адрес в поле ниже и\n' +
                                      'выберите подходящий из списка'}
                                  register={register}
                                  reset={reset}
                                  setError={setError}
                                  errors={errors}
                                  trigger={trigger}
                                  type={'text'}
                                  setValue={setValue}
                                  textError={'Укажите город и выберите его из выпадающего списка'}
                                  status={errors.region === undefined && touchedFields.region ? true : undefined}
                    />
                    {
                        !!localStorage.getItem('click') && !errors.region &&
                        <DadataInput  {...register("city")}
                                      placeholder={'Например: Москва'}
                                      defaultValue={addressInStore[1]}
                                      label={'Выберите город или населен. пункт'}
                                      name={'city'}
                                      register={register}
                                      setValue={setValue}
                                      setError={setError}
                                      errors={errors}
                                      trigger={trigger}
                                      type={'text'}
                                      textError={'Укажите город и выберите его из выпадающего списка'}
                                      status={errors.city === undefined && touchedFields.city ? true : undefined}
                        />
                    }

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
