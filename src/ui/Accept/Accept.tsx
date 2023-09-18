import React, {CSSProperties} from "react";
import {iconsConfig} from "./IconConfig";
export interface Colors {
    primaryColor: string,
    greenColor: string,
    dangerColor: string,
    successColor: string,
    blueColor: string,
    blackColor: '#000',
    grayColor: string,
    sovbankColor: string,
    kkSovbankIconColor: string;
    kkSovbankColor: string;
    firstCreditColor: string,
    sovbankIconColor: string,
    whiteColor: string
}
export interface IconProps {
    size?: number
    color?: keyof Colors
    containerClassName?: string
    containerStyle?: CSSProperties
}
export const Accept: React.FC<IconProps & { strokeWidth?: number }> = (
    {
        size,
        strokeWidth,
        color,
        containerClassName,
        containerStyle
    }) => {
    return (
        <div style={{
            width: size || iconsConfig.sizes.width,
            height: size || iconsConfig.sizes.height,
            flexShrink: 0, ...containerStyle
        }}
             className={containerClassName}>
            <svg width="100%" height="100%" viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 15.5L15.875 29L39 2"
                    stroke={iconsConfig.colors[color || 'primaryColor']}
                    strokeWidth={strokeWidth || 4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
