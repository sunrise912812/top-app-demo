import { CardProps } from "./Card.props";
import cn from 'classnames';
import styles from './Card.module.css';
import { forwardRef, ForwardedRef } from "react";

export const Card = forwardRef(({color='white', children, className, ...props} : CardProps, ref : ForwardedRef<HTMLDivElement>) : JSX.Element =>{
    return(
        <div className={cn(styles.card, className, {
            [styles.white] : color === 'white',
            [styles.blue] : color === 'blue',
        })} ref={ref} {...props}>{children}</div>
    );
});