import React, {ChangeEvent, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import cls from './DadataInput.module.scss'
import {classNames} from "../../lib/classNames/classNames";
import {FieldErrors, UseFormRegister, UseFormReset, UseFormSetError, UseFormSetValue, UseFormTrigger} from "react-hook-form";
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
import {localStorageWrapper} from "../../utils/storage";


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
    setValue?: UseFormSetValue<IFormValuesWork>
}


export const DadataInput = memo(forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const [regionData, setRegionData] = useLocalStorageState('regionData', {})
    const [cityData, setCityData] = useLocalStorageState('cityData', {})
    const [resultAddress, setResultAddress] = useLocalStorageState('resultAddress', [])
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
       setValue,
        ...otherProps
    } = props
    const initValue = type === 'text' ? '' : ''
    const [value, setValueLs] = useLocalStorageState(`${name}`, initValue)
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
        setValueLs(e.currentTarget.value)
        setShowList(true)
    }
    const onClose = ()=>{
        setShowList(false)
    }
    useOutsideClick(dropdownRef, onClose, showList)
    const clickItem =async (address: string[], el:DadataAddrData, name: string) =>{
        console.log('address', address)
        if (name === 'region') {
            setValueLs(address[0])
        }
        if (name === 'city') {
            setValueLs(address[1])
        }
        setResultAddress(address)
        let dataForRegionInput;
        let dataForCity;
        localStorage.setItem('click', address[0])
        setShowList(false)
        await  trigger('region')
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
            dataForCity = {
                city: el.data.city,
                city_district: el.data.city_district,
                city_district_fias_id: el.data.city_district_fias_id,
                city_district_kladr_id: el.data.city_district_kladr_id,
                city_district_type: el.data.city_district_type,
                city_fias_id: el.data.city_fias_id,
                city_kladr_id: el.data.city_kladr_id,
                city_type: el.data.city_type,
                city_with_type: el.data.city_with_type,
                fias_code: el.data.fias_code,
                fias_level: el.data.fias_level,
                okato: el.data.okato,
                postal_code: el.data.postal_code,
                value: el.value
            }
            setRegionData(dataForRegionInput)
            setCityData(dataForCity)
        }





    const getCurrentItem = (el: DadataAddrData) => {
        let region = `${el.data.region} ${el.data.region_type_full}`
        let city = el.data.city_type_full ?  `${el.data.city_type_full} ${el.data.city}`: ''
        let street = el.data.street_type_full ? `${el.data.street_type_full} ${el.data.street}`: ''
        let area = el.data.area  ? `${el.data.area_type_full} ${el.data.area}`: ''
        let settlement = el.data.settlement  ? `${el.data.settlement_type_full} ${el.data.settlement}`: ''
        let cityArea = el.data.city_area ? `${el.data.city_area}`: ''
        let arr = [region, city, cityArea, street, area, settlement]
        let resultArr =  arr.filter(el => el!== '')
        let result =  arr.filter(el => el!== '').join(', ')
       return resultArr
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
                {value && showList && <ul className={cls.DropDownList}>
                    {/*{ searchAddress && <div className={cls.text}>Выберите вариант из списка, нажав на него или продолжите ввод.</div>}*/}
                    {
                        searchAddress && searchAddress.map(el => (
                            <li onClick={()=>clickItem(getCurrentItem(el), el, name)} key={el.value} className={cls.DropDownItem}>{getCurrentItem(el).join(', ')}</li>
                        ))
                    }
                </ul>}
                <RenderIcon status={status} field={'text'}/>
                {errors?.[name] && <div className={cls.textError}>{textError}</div>}
            </div>
        </div>
    );
    //`${el.data.region} ${el.data.region_type_full}, ${el.data.city_type_full} ${el.data.city} ${el.data.metro ? `, метро ${el.data.metro[0].name}`:''}`
}))

