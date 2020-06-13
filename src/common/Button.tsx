import React from 'react'

type ButtonProps = {
    onClick: any,
    className?: string,
    children: any
}

function Button({onClick, 
    className, 
    children}: ButtonProps) {

    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
}

export default Button;