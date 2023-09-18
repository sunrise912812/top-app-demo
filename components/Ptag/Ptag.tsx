import { PtagProps } from "./Ptag.props";
import cn from 'classnames';
import styles from './Ptag.module.css';

export const Ptag = ({size='m', children, className, ...props} : PtagProps) : JSX.Element =>{
    return(
        <p className={cn(styles.p, className, {
            [styles.small] : size === 's',
            [styles.middle] : size === 'm',
            [styles.large] : size === 'l'
        })} {...props}>{children}</p>
    );
};