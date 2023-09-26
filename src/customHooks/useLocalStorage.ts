import {SetStateAction, useCallback, useState} from "react";
import {localStorageWrapper} from "../utils/storage";

export const useLocalStorageState = <T>(key: string, initialValue: T | (()=>T)) => {

    const [value, setValue] = useState(()=>{
        const savedValue = localStorageWrapper.get<T>(key)
        if (typeof savedValue !== 'undefined') {
            return savedValue
        }
        return isFunction(initialValue) ? initialValue() : initialValue
    })

    const updateValue = useCallback((newValue: SetStateAction<T>)=>{
        setValue(newValue)
        const actualValue = isFunction(newValue) ? newValue(value) : newValue
        localStorageWrapper.set(key, actualValue)
    },[key, value])
    return [value, updateValue] as const
}

type anyFunction = (...args: any[]) =>any

function isFunction (val: unknown): val is anyFunction {
    return typeof val === 'function'
}
