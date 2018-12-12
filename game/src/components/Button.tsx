interface ButtonProps {
    title: string;
}

export const Button = (props: ButtonProps) => {
    const { title } = props;

    return (
        <div className={`${title}-button`}>
           {title}
        </div>
    );
}