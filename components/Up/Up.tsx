import { useScrollY } from '@/hooks/useScrollY';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import styles from './Up.module.css';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = () : JSX.Element =>{

    const controls = useAnimation();
    const y = useScrollY();

    useEffect(()=>{
        controls.start({opacity : y / document.body.scrollHeight});
    },[y, controls]);

    const scrollToUp = ()=>{
        window.scrollTo({
            top: 0,
            behavior : 'smooth'
        });
    };

    return(
        <motion.div className={styles.up} animate={controls} initial={{opacity: 0}}>
            <ButtonIcon icon='up' appearance='primary' onClick={scrollToUp}/>
        </motion.div>
    );
};