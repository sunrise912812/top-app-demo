import { ReviewFormProps } from "./ReviewForm.props";
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Raiting } from "../Raiting/Raiting";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import CloseIcon from './close.svg';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";
import axios from "axios";
import { IReviewSendResponse } from "./ReviewForm.interface";
import { API } from "@/helpers/api";
import { useState } from "react";
import { AxiosError } from "axios";

export const ReviewForm = ({ productId , isOpened, className, ...props} : ReviewFormProps) : JSX.Element =>{
    const { register, control, handleSubmit, formState : {errors}, reset, clearErrors } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setIsError] = useState<string>('');

    const onSubmit: SubmitHandler<IReviewForm> = async (formData : IReviewForm) => {
        try{
            const {data} = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, "rating" : formData.raiting,  productId});
            if(data.message){
                setIsSuccess(true);
                reset();
            }
            else{
                setIsSuccess(false); 
                setIsError('Что-то пошло не так!');
            }
        }
        catch(e : unknown){
            const err = e as AxiosError;
            setIsSuccess(false);
            setIsError(err.message);
        }
        
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input 
                {...register("name", {required: {value : true, message : 'Заполните имя!'}})}  
                placeholder={'Имя'}
                error={errors.name}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.name ? true : false}/>
                <Input 
                {...register("title", {required: {value : true, message : 'Заполните заголовок!'}})}  
                className={styles.title} 
                placeholder={'Заголовок отзыва'}
                error={errors.title}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.title ? true : false}/>
                <div className={styles.raiting}>
                    <span>Оценка:</span>
                    <Controller 
                    control={control}
                    rules={{required: {value : true, message : 'Укажите оценку!'}}}
                    name='raiting' 
                    render={({field})=> {
                        return(
                            <Raiting raiting={field.value} 
                            ref={field.ref} 
                            isEditable={true} 
                            setRaiting={field.onChange} 
                            error={errors.raiting}
                            tabIndex={isOpened ? 0 : -1}/>
                        );
                    }
                    }/>      
                </div>
                <TextArea 
                {...register("description", {required: {value : true, message : 'Заполните текст отзыва!'}})}  
                className={styles.description} 
                placeholder={'Текст отзыва'}
                error={errors.description}
                tabIndex={isOpened ? 0 : -1}
                aria-label="Текст отзыва"
                aria-invalid={errors.description ? true : false}/>
                <div className={styles.submit}>
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={()=>clearErrors()}>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)} role="alert">
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <button aria-label="Закрыть оповещение" className={styles.close} onClick={()=>setIsSuccess(false)}>
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.panel,styles.error)}>
                    {'Что-то пошло не так, попробуйте обновить страницу!'}
                    <button aria-label="Закрыть оповещение" className={styles.close} onClick={()=>setIsError('')}>
                        <CloseIcon/>
                    </button>
            </div>}
        </form>
    );
};