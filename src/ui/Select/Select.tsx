import {UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../components/formWrapper/FormWrapper";
import {forwardRef} from "react";

export const Select = forwardRef<
    HTMLSelectElement,
    { label: string } & ReturnType<UseFormRegister<IFormValues>>
    >(({ onChange, onBlur, name, label }, ref) => (
    <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </>
))
