import React, {forwardRef, InputHTMLAttributes, memo} from 'react';
import cls from './Input.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";



type HTMLInputProps =
    Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
    & ReturnType<UseFormRegister<IFormValues>>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
}


export const Input = memo( forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const {
        className,
        type = 'text',
        placeholder,
        label,

        ...otherProps
    } = props

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            <label className={classNames(cls.label, {}, [className])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <input className={cls.Input}
                   placeholder={placeholder}
                   type={type}
                   ref={ref}
                   {...otherProps}
            />
        </div>
    );
}))

