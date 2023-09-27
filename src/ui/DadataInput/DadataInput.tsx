import React, {ChangeEvent, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import cls from './DadataInput.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {FieldErrors, UseFormRegister, UseFormSetError, UseFormTrigger} from "react-hook-form";
import {text} from "stream/consumers";
import {RenderIcon} from "../RenderIcon/RenderIcon";
import {IFormValuesWork} from "../../components/WorkInfoEmployment/WorkInfoEmployment";
import {useLocalStorageState} from "../../customHooks/useLocalStorage";
import {getAddressSuggestions} from "../../api/DadataApi";
import {Dadata} from "../../api/FormApiTypes";
import DadataAddrData = Dadata.DadataAddrData;
import {useOutsideClick} from "../../customHooks/useOutsideClick";
import useCurrentItemStore from "../../store/addressStore";
import useRegionStore from "../../store/regionStore";


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
    trigger: UseFormTrigger<IFormValuesWork>
}


export const DadataInput = memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const {setAddress, el} = useCurrentItemStore()
    const {setRegion, region} = useRegionStore()
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
        trigger,
        ...otherProps
    } = props
    const initValue = type === 'text' ? '' : ''
    const [value, setValue] = useLocalStorageState(`${name}`, initValue)
    const [inputFocus, setInputFocus] = useState(false)
    const [searchAddress, setSearchAddress] = useState<DadataAddrData[]>()
    const dropdownRef = useRef(null)
    const [showList, setShowList] = useState(false)
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
        console.log(searchAddress)
        setValue(e.currentTarget.value)
        setShowList(true)
    }
    const onClose = ()=>{
        setShowList(false)
    }
    useOutsideClick(dropdownRef, onClose, showList)

    const clickItem =async (address: string, el:DadataAddrData, name: string) =>{
        let dataForRegionInput;
        console.log('name', name)
        localStorage.setItem('click', address)
        setValue(address)
        setAddress(el)
        setShowList(false)
        await  trigger('region')
        console.log(errors)
        if (name === 'region') {
             dataForRegionInput = {
                fias_code: el.data.fias_code,
                fias_level: el.data.fias_level,
                okato: el.data.okato,
                postal_code: el.data.postal_code,
                region: el.data.region,
                region_fias_id: el.data.region_fias_id,
                region_kladr_id: el.data.region_kladr_id,
                region_type: el.data.region_type,
                region_with_type: el.data.region_with_type, value: el.value
            }
            setRegion(dataForRegionInput)
            console.log(region)
        }


    }
    const hasCity = () =>{
        return  !!localStorage.getItem('click')
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
                       {...register(name , {required: true, validate:hasCity})}
                       {...otherProps}
                       onClick={e => {
                           e.currentTarget.focus()
                       }}
                       value={value}
                       onChange={changeHandler}
                />
                {!value && inputFocus &&
                    <div className={cls.hint} style={{textAlign: 'center'}}>Укажите "Введите адрес в поле ниже и
                        выберите подходящий из списка" и выберите вариант из появившегося списка</div>}
                <button onClick={()=>console.log(region)}>region</button>
                {value && showList && <ul className={cls.DropDownList}>
                    {/*{ searchAddress && <div className={cls.text}>Выберите вариант из списка, нажав на него или продолжите ввод.</div>}*/}
                    {
                        searchAddress && searchAddress.map(el => (
                            <li onClick={()=>clickItem(el.value, el, name)} key={el.value} className={cls.DropDownItem}>{el.value}</li>
                        ))
                    }
                </ul>}
                <RenderIcon status={status} field={'text'}/>
                {errors?.[name] && <div className={cls.textError}>{textError}</div>}
            </div>
        </div>
    );
}))

