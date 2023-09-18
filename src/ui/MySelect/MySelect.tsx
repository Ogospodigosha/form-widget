import React, {FC, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import cls from './MySelect.module.scss'
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import {classNames} from "../../lib/classNames/classNames";
import useCurrentItemStore from "../../store/currentItemStore";
import {Accept} from "../Accept/Accept";

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
        <div style={{backgroundColor:'#e3eafa', borderRight: '1px solid #5a5a5a', borderTop: '1px solid #5a5a5a' }}>
        <li  style={{borderRight: 'none'}} className={cls.DropDownItem} onClick={()=>getCurrentItem(title)}>
            <div  style={{display: 'flex', justifyContent: 'space-between'}}>
                <span >{title}</span>
                <Accept size={20} color={'greenColor'}/>
            </div>
        </li>
        </div>
        )
}

export const MySelect = memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const setItem = useCurrentItemStore(store => store.setItem)
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
    const [showList, setShowList] = useState(false)
    const [currentItem, setCurrentItem] = useState('')
    const dropdownRef = useRef(null)
    const clickHandler = (event: any ) => {
        event.preventDefault()
        setShowList(prev => !prev)
    }
    const onClose = ()=>{
        setShowList(false)
    }

    const getCurrentItem = (title: string) =>{
        setItem(title)
        setCurrentItem(title)
        setShowList(false)
    }

    const handleClick = (e:Event) =>{
        if (!dropdownRef.current) return
        if (!dropdownRef.current.contains(e.target)) {
            onClose()
        }
    }
    useEffect(()=>{
        if (!showList) return
        document.addEventListener('click', handleClick)
        return ()=>{
            document.removeEventListener('click', handleClick)
        }
    },[showList, onClose])
    return (
        <div ref={dropdownRef} className={cls.DropDownBtn}>
            <label className={classNames(cls.label, {}, [])}>{label}
                <span style={{color: 'red'}}>{' *'}</span>
            </label>
            <div style={{width: '100%', position: 'relative'}}>
                <button className={cls.MySelect} onClick={(event) => clickHandler(event)}>{currentItem || 'Кредитная карта' }</button>
                {showList && <ul className={cls.DropDownList}>
                    <div className={cls.text}>Выберете вариант из списка, нажав на него</div>
                    {
                        option.map(el => (
                            el.title !== currentItem ? <li key={el.value} className={cls.DropDownItem} onClick={()=>getCurrentItem(el.title)}>{el.title}</li>:
                                <CurrentItem  getCurrentItem={getCurrentItem} {...el} />
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

