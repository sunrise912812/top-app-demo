import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from './sort.svg';
import cn from 'classnames';
import styles from './Sort.module.css';

export const Sort = ({sort, setSort, className, ...props} : SortProps) : JSX.Element => {
    return(
        <div className={cn(styles.sort, className)} {...props}>
            <div className={styles.sortName} id="sort">Сортировка</div>
            <button id="rating" onClick={()=> setSort(SortEnum.Raiting)}
            className={cn({
                [styles.active] : sort === SortEnum.Raiting
            })}
            aria-selected={sort === SortEnum.Raiting}
            aria-labelledby="sort rating">
                <SortIcon className={styles.sortIcon}/>По&nbsp;рейтингу
            </button>
            <button id="price" onClick={()=> setSort(SortEnum.Price)}
            className={cn({
                [styles.active] : sort === SortEnum.Price
            })}
            aria-selected={sort === SortEnum.Price}
            aria-labelledby="sort price">
                <SortIcon className={styles.sortIcon}/>По цене
            </button>
        </div>
    );
};