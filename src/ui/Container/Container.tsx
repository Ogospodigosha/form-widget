import React, {FC} from 'react';
import './Container.scss'

interface Container {
    cls: string

}

export const Container: FC<Container> = ({cls,  children}) => {
    return (
        <div className={cls}>
            {children}
        </div>
    );
};
