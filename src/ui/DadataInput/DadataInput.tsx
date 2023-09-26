import React, {ChangeEvent, forwardRef, InputHTMLAttributes, memo, useRef, useState} from 'react';
import cls from './DadataInput.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {FieldErrors, UseFormRegister, UseFormSetError} from "react-hook-form";
import {text} from "stream/consumers";
import {RenderIcon} from "../RenderIcon/RenderIcon";
import {IFormValuesWork} from "../../components/WorkInfoEmployment/WorkInfoEmployment";
import {useLocalStorageState} from "../../customHooks/useLocalStorage";
import {getAddressSuggestions} from "../../api/DadataApi";
import {Dadata} from "../../api/FormApiTypes";
import DadataAddrData = Dadata.DadataAddrData;
import {useOutsideClick} from "../../customHooks/useOutsideClick";
import {log} from "util";


type HTMLInputProps =
    Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
    & ReturnType<UseFormRegister<IFormValuesWork>>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
    register: UseFormRegister<IFormValuesWork>
    errors: FieldErrors<IFormValuesWork>
    textError: string
    status: boolean
    setError: UseFormSetError<IFormValuesWork>
}


export const DadataInput = memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const {
        className,
        type = 'text',
        placeholder,
        label,
        register,
        name,
        errors,
        textError,
        status,
        setError,
        ...otherProps
    } = props
    const initValue = type === 'text' ? '' : ''
    const [value, setValue] = useLocalStorageState(`${name}`, initValue)
    const [inputFocus, setInputFocus] = useState(false)
    const [searchAddress, setSearchAddress] = useState<DadataAddrData[]>()
    const dropdownRef = useRef(null)
    const [showList, setShowList] = useState(false)
    const [click, setClick] = useLocalStorageState(`address`, '')
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const request: Dadata.DadataAddrRequest = {
            query: e.currentTarget.value,
            from_bound: {value: ''},
            to_bound: {value: ''},
            locations: [],
            locations_boost: [],
            count: 5
        }
        const response = getAddressSuggestions(request).then(res => setSearchAddress(res))
        setValue(e.currentTarget.value)
    }
    const onClose = ()=>{
        setShowList(false)
    }

let a = localStorage.getItem('click')
    useOutsideClick(dropdownRef, onClose, showList)
    const clickItem =(address: string) =>{
        setValue(address)
        console.log('address', address)
        localStorage.setItem('click', address)
        setShowList(false)
    }
    return (
        <div ref={dropdownRef} className={classNames(cls.InputWrapper, {}, [className])}>
            <label className={classNames(cls.label, {}, [className])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <div style={{position: 'relative'}} className={classNames(cls.InputWrapper, {}, [className])}
                 onFocus={() => setInputFocus(true)}
                 onBlur={() => setInputFocus(false)}>
                <input className={errors?.[name] ? `${cls.Input} ${cls['input-error']}` : cls.Input}
                       placeholder={placeholder}
                       type={type}
                       {...register(name)}
                       {...otherProps}
                       onClick={e => {
                           e.currentTarget.focus()
                           setShowList(prev => !prev)
                       }}
                       value={value}
                       onChange={changeHandler}
                />
                {!value && inputFocus &&
                    <div className={cls.hint} style={{textAlign: 'center'}}>Укажите "Введите адрес в поле ниже и
                        выберите подходящий из списка" и выберите вариант из появившегося списка</div>}
                {value && showList && <ul className={cls.DropDownList}>
                    {/*{ searchAddress && <div className={cls.text}>Выберите вариант из списка, нажав на него или продолжите ввод.</div>}*/}
                    {
                        searchAddress && searchAddress.map(el => (
                            <li onClick={()=>clickItem(el.value)} key={el.value} className={cls.DropDownItem}>{el.value}</li>
                        ))
                    }
                </ul>}
                <RenderIcon status={status} field={'text'}/>
                {errors?.[name] && <div className={cls.textError}>{textError}</div>}
            </div>
        </div>
    );
}))

