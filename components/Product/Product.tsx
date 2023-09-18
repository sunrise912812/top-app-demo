import { ProductProps } from "./Product.props";
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from "../Card/Card";
import { Raiting } from "../Raiting/Raiting";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { priceRu } from "@/helpers/helpers";
import { Divider } from "../Divider/Divider";
import { decOfNumber } from "@/helpers/helpers";
import Image from "next/image";
import { useState, useRef, forwardRef, ForwardedRef } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props} : ProductProps, ref : ForwardedRef<HTMLDivElement>) : JSX.Element =>{
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible : { opacity : 1, height : 'auto' },
        hidden : { opacity : 0, height : 0 }
    };

    const scrollToReview = () =>{
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior : 'smooth',
            block : 'start'
        });
        reviewRef.current?.focus();
    };

    return(
    <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
                alt={product.title}
                width={70}
                height={70}/>
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                <span><span className="visualyHidden">цена</span>{priceRu(product.price)}</span>
                {product.oldPrice && <Tag className={styles.oldPrice} color='green' size='m'><span className="visualyHidden">скидка</span>{priceRu(product.price - product.oldPrice)}</Tag>}
            </div>
            <div className={styles.credit}><span className="visualyHidden">кредит</span>{priceRu(product.credit)}/<span className={styles.month}>мес</span></div>
            <div className={styles.raiting}>
                <span className="visualyHidden">{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                <Raiting raiting={product.reviewAvg ?? product.initialRating}/></div>
            <div className={styles.tags}>
                {product.categories.map((c)=>{
                    return(
                        <Tag className={styles.category} key={c} color={'ghost'}>{c}</Tag>
                    );
                })}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>цена</div>
            <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
            <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {decOfNumber(product.reviewCount, ['отзыв','отзыва','отзывов'])}</a></div>
            <Divider className={styles.hr}/>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
                {product.characteristics.map((c)=>{
                    return(
                        <div className={styles.characteristic} key={c.name}>
                            <span className={styles.characteristicName}>{c.name}</span>
                            <span className={styles.characteristicDots}></span>
                            <span className={styles.characteristicValue}>{c.value}</span>
                        </div>
                    );
                })}
            </div>
            <div className={styles.advBlock}>
                {product.advantages && <div className={styles.advantages}>
                    <div className={styles.advTitle}>Преимущества</div>
                    <div>{product.advantages}</div>
                </div>}
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div className={styles.advTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                </div>}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)}/>
            <div className={styles.actions}>
                <Button appearance="primary" className={styles.moreButton}>Узнать подробнее</Button>
                <Button appearance="ghost" 
                arrow={isReviewOpened ? "down" : "right"} 
                className={styles.reviewButton}
                onClick={()=>setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}>Читать отзывы</Button>
            </div>
        </Card>
        <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
            <Card color='blue' className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
                {product.reviews.map((review)=>{
                    return(
                        <div key={review._id}>
                            <Review review={review}/>
                            <Divider/>
                        </div>
                    );
                })}
                <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
            </Card>
        </motion.div>
    </div>
    );
}));