import { Htag } from "@/components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import { Tag } from "@/components";
import styles from './TopPageComponent.module.css';
import { HhData } from "@/components";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { Advantage } from "@/components/Advantages/Advantages";
import { Sort } from "@/components"; 
import { SortEnum } from "@/components/Sort/Sort.props";
import { useReducer, useEffect } from "react";
import { sortReducer } from "./sort.reducer";
import { Product } from "@/components";
import { useReducedMotion } from "framer-motion";


export const TopPageComponent = ({ firstCategory, page, products } : TopPageComponentProps) => {
    const [{products : sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {sort : SortEnum.Raiting, products});
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sortParam : SortEnum)=>{
        dispatchSort({type : sortParam});
    };

    useEffect(()=>{
        dispatchSort({type : 'reset', intitialState : products});
    },[products]);
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag={'h1'}>{page.title}</Htag>
                {products && <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div role='list'>
                {sortedProducts && sortedProducts.map((p)=>{
                    return(
                        <Product role='listitem' layout={shouldReduceMotion ? false : true} key={p._id} product={p}/>
                    );
                })}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={'h2'}>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
                {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
                {page.advantages && page.advantages.length > 0 && <>
                    <Htag tag={'h2'}>Преимущества</Htag>
                    <Advantage advantages={page.advantages}/>
                </>}
                {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html : page.seoText}}/>} {/*Такая вставка не безорасно, можем только с админки так вставлять готовый html*/}
                <Htag tag={'h2'}>Получаемые навыки</Htag>
                {page.tags.map((t)=>{
                    return(
                        <Tag key={t} size={'m'} color={'primary'}>{t}</Tag>
                    );
                })}
        </div>
    );
};