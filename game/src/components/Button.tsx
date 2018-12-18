import React from 'react';

interface ButtonProps {
    title: string;
    cb?: (e: React.MouseEvent) => void;
}

export const Button = (props: ButtonProps) => {
    const { title, cb } = props;

    return (
        <button className={`${title}-button`} onClick={cb}>
           {title}
        </button>
    );
}