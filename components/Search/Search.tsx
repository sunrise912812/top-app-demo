import { SearchProps } from "./Search.props";
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import React, { useState } from "react";
import GlassIcon from './glass.svg';
import { useRouter } from "next/router";

export const Search = ({ className, ...props} : SearchProps) : JSX.Element =>{
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () =>{
        router.push({
            pathname : './search',
            query : {
                q : search
            }
        });
    };

    const handleKeyDown = (event : React.KeyboardEvent) =>{
        if(event.code !== 'Enter') return;
        goToSearch();
    };
    return(
        <form className={cn(className, styles.search)} {...props} role="search">
            <Input 
                className={styles.input} 
                placeholder="Поиск..." 
                value={search} 
                onChange={(event : React.ChangeEvent<HTMLInputElement>)=>setSearch(event.target.value)}
                onKeyDown={(event : React.KeyboardEvent<HTMLInputElement>)=>handleKeyDown(event)}/>
            <Button aria-label="Искать по сайту" appearance="primary" className={styles.button} onClick={goToSearch}><GlassIcon/></Button>
        </form>
    );
};