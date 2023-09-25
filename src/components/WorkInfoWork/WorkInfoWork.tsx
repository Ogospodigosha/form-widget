import React from 'react';
import {useNavigate} from "react-router";
import {Container} from "../../ui/Container/Container";
import cls from './WorkInfoWork.module.scss'
import {Button, ThemeButton} from "../../ui/Button/Button";
import {getValueForCreditTarget} from "../../utils/getValueForCreditTarget";
import {localStorageWrapper} from "../../utils/storage";

export const WorkInfoWork = () => {
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
        localStorage.setItem('step', '2.1')
        navigate(`/credit/${creditProduct}/work_info`)
    }
    return (
        <div style={{maxWidth: '1140px', margin: '0 auto'}}>
            <Container cls={cls.Container}>
                <h2 className={cls.header} style={{textAlign: 'left', margin: '0 0 16px'}}>Информация о трудоустройстве</h2>
                <span className={cls.subtitle} style={{width: '100%', textAlign: 'left', marginBottom: '16px'}}>Как вы трудоустроены?</span>
                <div style={{columnGap:'10px'}} className={cls.grid}>
                    <button className={cls.button} onClick={work} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Официально</button>
                    <button className={cls.button} onClick={dontWork} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Неофициально</button>
                    <button className={cls.button} onClick={dontWork} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Индивидуальный предприниматель</button>
                    <button className={cls.button} onClick={dontWork} style={{width: '100%', margin: '0', padding: '10px 5px', textAlign: 'center'}}>Владелец бизнеса</button>
                </div>
            </Container>
            <div style={{padding: '0 24px'}}>
                <Button theme={ThemeButton.STANDARD} onClick={goBack}>Назад</Button>
            </div>
        </div>
    );
};


