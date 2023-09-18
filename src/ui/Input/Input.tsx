import React, { forwardRef, InputHTMLAttributes, memo} from 'react';
import cls from './Input.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import {text} from "stream/consumers";
import {RenderIcon} from "../RenderIcon/RenderIcon";



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
            />
                <RenderIcon status={status} field={'text'}/>
                {errors?.[name] && <div style={{color: 'red', padding: '8px', marginTop:'5px', fontSize:'12px', fontWeight:'700', fontFamily: 'HelveticaNeueCyr,sans-serif,normal'}}>{textError}</div>}
            </div>
        </div>
    );
}))

