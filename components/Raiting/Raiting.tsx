import { RaitingProps } from "./Raiting.props";
import styles from './Raiting.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import StarIcon from './star.svg';
import { useRef } from "react";


export const Raiting = forwardRef(({isEditable = false, raiting, setRaiting, tabIndex, error, ...props} : RaitingProps, ref : ForwardedRef<HTMLDivElement>) : JSX.Element =>{
    const [raitingArray, setRaitingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const raitingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(()=>{
        constructRaiting(raiting);
    },[raiting, tabIndex]);

    const changeDisplay = (i : number)=>{
        if(!isEditable){
            return;
        }
        constructRaiting(i);
    };

    const clickRaiting = (i : number)=>{
        if(!isEditable || !setRaiting){
            return;
        }
        setRaiting(i);  
    };

    const computeFocus = (r : number, i : number) : number=>{
        if(!isEditable){
            return -1;
        }
        if(!raiting && i == 0){
            return tabIndex ?? 0;
        }
        if(r == i + 1){
            return tabIndex ?? 0;
        }
        return -1;
    };

    const handleKey = (e : React.KeyboardEvent<HTMLDivElement>) =>{
        if(!isEditable || !setRaiting){
            return;
        }
        if(e.code == 'ArrowRight' || e.code == 'ArrowUp'){
            e.preventDefault();
            if(!raiting){
                setRaiting(1);
            }else{
                setRaiting(raiting < 5 ? raiting + 1 : 5);
            }
            raitingArrayRef.current[raiting]?.focus();
            
        }
        if(e.code == 'ArrowLeft' || e.code == 'ArrowDown'){
            e.preventDefault();
            if(!raiting){
                setRaiting(1);
            }else{
                setRaiting(raiting > 1 ? raiting -1 : 1);
            }
            raitingArrayRef.current[raiting-2]?.focus();
        }
    };

    const constructRaiting = (currentRaiting : number)=>{
        const updatedArray = raitingArray.map((r: JSX.Element, i: number)=>{
            return(
            <span className={cn(styles.star, {
                [styles.filled] : i < currentRaiting,
                [styles.editable] : isEditable
            })} 
            onMouseEnter={()=>changeDisplay(i+1)} 
            onMouseLeave={()=>changeDisplay(raiting)} 
            onClick={()=>clickRaiting(i+1)}
            tabIndex={computeFocus(raiting, i)}
            onKeyDown={handleKey}
            ref={r => raitingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={raiting}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + raiting)}
            aria-invalid={error ? true : false}>
                <StarIcon key={i}/>
            </span>
            );
        });
        setRaitingArray(updatedArray);
    };
    return(
        <div {...props} ref={ref} className={cn(styles.raitingWrapper, {
            [styles.error] : error
        })}>
            {
                raitingArray.map((r: JSX.Element, i: number)=>{
                    return(
                        <span key={i}>{r}</span>
                    );
                })
            }
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});