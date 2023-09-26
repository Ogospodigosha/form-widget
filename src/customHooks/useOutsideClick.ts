import {MutableRefObject, useEffect} from "react";
import {UseFormSetError} from "react-hook-form";
import {IFormValuesWork} from "../components/WorkInfoEmployment/WorkInfoEmployment";

export const useOutsideClick = (elementRef: MutableRefObject<HTMLElement | null>, handler:()=> void, attached=true, isClicked?: boolean, setError?:UseFormSetError<IFormValuesWork>) =>{
    useEffect(()=>{
        if (!attached) return
        console.log('effect')
        const handleClick =(e:Event)=>{
            if (!elementRef.current) return
            if (!elementRef.current.contains(e.target as HTMLDivElement)) {
                handler()
            }
        }
        document.addEventListener('click', handleClick)
        return ()=>{
            document.removeEventListener('click', handleClick)
        }
    },[elementRef, handler, attached])
}
