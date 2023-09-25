import React from 'react';
import {useNavigate} from "react-router";
import {Container} from "../../ui/Container/Container";
import cls from './WorkInfo.module.scss'
import {Button, ThemeButton} from "../../ui/Button/Button";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {localStorageWrapper} from "../../utils/storage";

export const WorkInfo = () => {
    const navigate = useNavigate()
    const creditProduct =getValueForCreditTarget(localStorageWrapper.get('credit_target'))  || 'credit_card'
    const work = () => {
        localStorage.setItem('step', '2.1')
        navigate('work')
    }
    const dontWork = () => {
        localStorage.setItem('step', '2.2')
        navigate('dont_work/standing')
    }
    const goBack = () =>{
        localStorage.setItem('step', '1')
        navigate(`/credit/${creditProduct}/credit_parameters_info`)
    }
    return (
        <div style={{maxWidth: '1140px', margin: '0 auto'}}>
            <Container cls={cls.Container}>
                <h2 className={cls.header} style={{textAlign: 'left', margin: '0 0 16px'}}>Вы работаете?</h2>
                <div style={{columnGap:'10px'}} className={cls.grid}>
                    <button className={cls.button} onClick={work} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Да</button>
                    <button className={cls.button} onClick={dontWork} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Нет</button>
                </div>
            </Container>
            <div style={{padding: '0 24px'}}>
                <Button theme={ThemeButton.STANDARD} onClick={goBack}>Назад</Button>
            </div>
        </div>
    );
};


