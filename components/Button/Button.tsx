import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from 'react';

export const Button = ({children, appearance, arrow = 'none', className, ...props} : ButtonProps) : JSX.Element =>{
    
    const scale = useMotionValue(1);

    useEffect(()=>{
        scale.onChange((s)=>console.log(s)); /*Подписались на изменение свайства scale, в консоле увидим величину изменения*/
    },[]);
    
    return(
        <motion.button whileHover={{scale : 1.05}} className={cn(styles.button, className, {
            [styles.primary] : appearance === 'primary',
            [styles.ghost] : appearance === 'ghost'
        })}
        style={{scale}}
        {...props}
        >{children}
        {arrow !== 'none' && <span className={cn(styles.arrow, {
            [styles.down] : arrow === 'down',
            [styles.rigth] : arrow === 'right'
            })}>
                <ArrowIcon/>
                </span>}
        </motion.button>
    );
};