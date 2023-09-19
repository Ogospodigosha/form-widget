import React, {FC, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import cls from './MySelect.module.scss'
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import {classNames} from "../../lib/classNames/classNames";
import useCurrentItemStore from "../../store/currentItemStore";
import {Accept} from "../Accept/Accept";
import {useOutsideClick} from "../../customHooks/useOutsideClick";

type HTMLInputProps =
    Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
    & ReturnType<UseFormRegister<IFormValues>>

interface InputProps extends HTMLInputProps {
    className?: string
    label?: string
    register: UseFormRegister<IFormValues>
    errors: FieldErrors<IFormValues>
    option: Array<{ value: string, title: string }>
    setValue: UseFormSetValue<IFormValues>
}
type Eltype = {
    value:string
    title: string
    getCurrentItem: (title: string) => void
}
const CurrentItem:FC<Eltype> = ({value, title, getCurrentItem }) => {
    return (
        <div className={cls.activeItem}>
        <li  style={{borderRight: 'none'}} className={cls.DropDownItem} onClick={()=>getCurrentItem(title)}>
            <div className={cls.activeItemFlex}>
                <span >{title}</span>
                <Accept size={20} color={'greenColor'}/>
            </div>
        </li>
        </div>
        )
}

export const MySelect = memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const {
        className,
        type = 'text',
        placeholder,
        label,
        register,
        name,
        errors,
        option,
        setValue,
        ...otherProps
    } = props
    const setCreditTargetSelectItem = useCurrentItemStore(store => store.setCreditTargetSelectItem)
    const setGenderSelectItem = useCurrentItemStore(store => store.setGenderSelectItem)
    const [showList, setShowList] = useState(false)
    const [currentItem, setCurrentItem] = useState('')
    const currentName = name === 'credit_target'? currentItem || 'Кредитная карта': name === 'gender' ? currentItem || 'Мужской':''
    const dropdownRef = useRef(null)
    const clickHandler = (event: any ) => {
        event.preventDefault()
        setShowList(prev => !prev)
    }
    const onClose = ()=>{
        setShowList(false)
    }

    const getCurrentItem = (title: string) =>{
        if (name === "credit_target") {
            setCreditTargetSelectItem(title)
            setCurrentItem(title)
            setShowList(false)
        } else if (name === 'gender') {
            setGenderSelectItem(title)
            setCurrentItem(title)
            setShowList(false)
        }
    }
    useOutsideClick(dropdownRef, onClose, showList )
    return (
        <div ref={dropdownRef} className={cls.DropDownBtn}>
            <label className={classNames(cls.label, {}, [])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <div className={cls.divSelect}>
                <button className={cls.MySelect} onClick={(event) => clickHandler(event)}>{currentName}</button>
                {showList && <ul className={cls.DropDownList}>
                    <div className={cls.text}>Выберете вариант из списка, нажав на него</div>
                    {
                        option.map(el => (
                            el.title !== currentItem ? <li key={el.value} className={cls.DropDownItem} onClick={()=>getCurrentItem(el.title)}>{el.title}</li>:
                                <CurrentItem key={el.value}  getCurrentItem={getCurrentItem} {...el} />
                        ))
                    }
                </ul>}
            </div>
            <input style={{display: 'none'}}
                   placeholder={placeholder}
                   type={type}
                   ref={ref}
                   {...register(name)}
                   {...otherProps}
            />
        </div>

    );
}));

