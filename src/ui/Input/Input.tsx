import React, {ChangeEvent, forwardRef, InputHTMLAttributes, memo} from 'react';
import cls from './Input.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import {text} from "stream/consumers";
import {RenderIcon} from "../RenderIcon/RenderIcon";
import {useLocalStorageState} from "../../customHooks/useLocalStorage";



type HTMLInputProps =
    Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
    & ReturnType<UseFormRegister<IFormValues>>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
    register: UseFormRegister<IFormValues>
    errors: FieldErrors<IFormValues>
    textError: string
    status: boolean
}


export const Input =  memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
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
        ...otherProps
    } = props
    const initValue = type === 'text' ? '': ''
    const [value, setValue] = useLocalStorageState(`${name}`, initValue)
    const allowOnlyRussianLetters=(value: string)=>{
       setValue(value.replace(/^[a-zA-Z0-9]+$/, ''))
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        if (type === 'text'){
            allowOnlyRussianLetters(e.currentTarget.value)
        } else {
            setValue(e.currentTarget.value )
        }

    }
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            <label className={classNames(cls.label, {}, [className])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <div className={classNames(cls.InputWrapper, {}, [className])}>
            <input className={errors?.[name] ? `${cls.Input} ${cls['input-error']}` : cls.Input }
                   placeholder={placeholder}
                   type={type}
                   ref={ref}
                   {...register( name )}
                   {...otherProps}
                   onClick={e => e.currentTarget.focus()}
                   value={value}
                   onChange={changeHandler}
            />
                <RenderIcon status={status} field={'text'}/>
                {errors?.[name] && <div className={cls.textError}>{textError}</div>}
            </div>
        </div>
    );
}))

