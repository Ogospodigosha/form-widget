import React, {FC} from 'react';
import './Container.scss'

interface Container {
    cls: string
    id: string
}

export const Container: FC<Container> = ({cls, id, children}) => {
    return (
        <div className={cls} id={id}>
            {children}
        </div>
    );
};
