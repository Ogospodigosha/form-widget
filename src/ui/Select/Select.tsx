import {UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import React, {forwardRef} from "react";
import {classNames} from "../../lib/classNames/classNames";
import cls from './Select.module.scss'

export const Select = forwardRef<HTMLSelectElement,
    { label: string, option: { value: string, title: string }[] } & ReturnType<UseFormRegister<IFormValues>>>(({
                                                                                                                   onChange,
                                                                                                                   onBlur,
                                                                                                                   name,
                                                                                                                   label,
                                                                                                                   option
                                                                                                               }, ref) => (
    <>
        {/*<label>{label}</label>*/}
        <div className={classNames(cls.SelectWrapper, {}, [])}>
            <label className={classNames(cls.label, {}, [])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <select className={cls.select} name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                    onClick={e => e.currentTarget.focus()}>

                    {
                        option.map(el => (
                            <option  value={el.value} key={el.value}>{el.title}</option>
                        ))
                    }

            </select>
        </div>
    </>
))
