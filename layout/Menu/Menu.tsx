import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from "next/link";
import { useRouter } from 'next/router';
import { firstLevelMenu } from "../../helpers/helpers";
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = () : JSX.Element =>{
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const variantsMenu = {
      visible : {
        marginBottom : 20,
        transition : shouldReduceMotion ? {} : {
          when : 'beforeChildren', /*Будем сначала анимировать корневой элемент (родителя)*/
          staggerChildren : 0.1
        }
      },
      hidden : {
        marginBottom : 0
      }
    };

    const variantsChildrenMenu = {
      visible : {
          opacity : 1,
          height : 'auto'
        },
      hidden : {
        opacity : shouldReduceMotion ? 1 : 0,
        height : 0
      }
    };

    const openSecondLevel = (secondCategory : string) => {
      setMenu && setMenu(menu.map((m)=>{
            if (m._id.secondCategory === secondCategory){
              setAnnounce(m.isOpened ? 'closed' : 'opened');
              m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const openSecondLevelKey = (key : KeyboardEvent, secondCategory : string) =>  {
      if (key.code == 'Space' || key.code == 'Enter'){
        key.preventDefault();
        openSecondLevel(secondCategory);
      }
    };

    const buildFirstLevel = () =>{
        return(
          <ul className={styles.firstLevelList}>
          {firstLevelMenu.map(m => {
            return(
              <li key={m.route}>
                  <Link href={`/${m.route}`} aria-expanded={m.id === firstCategory}>
                    <div className={cn(styles.firstLevel, {
                      [styles.firstLevelActive] : m.id === firstCategory
                    })}>
                      {m.icon}
                      <span>{m.name}</span>
                    </div>
                  </Link>
                  {m.id === firstCategory && buildSecondLevel(m)}
              </li>
            );
          })}
          </ul>
        );
    };

    const buildSecondLevel = (menuItem : FirstLevelMenuItem) =>{
      return(
        <ul className={styles.secondBlock}>
          {
            menu.map(m =>{
                if (m.pages.map((p)=> p.alias).includes(router.asPath.split('/')[2])){
                  m.isOpened = true;
                }
                return(
                <li key={m._id.secondCategory}>
                  <button tabIndex={0} aria-expanded={m.isOpened} 
                  onKeyDown={(key : KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} 
                  className={styles.secondLevel} 
                  onClick={()=> openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</button>
                    <motion.ul 
                      layout={true}
                      variants={variantsMenu}
                      initial={m.isOpened ? 'visible' : 'hidden'}
                      animate={m.isOpened ? 'visible' : 'hidden'}
                      className={styles.secondLevelBlock}
                      >
                        {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                    </motion.ul>
                </li>
              );
            })}
        </ul>
      );
    };

    const buildThirdLevel = (pages : PageItem[], route : string, isOpened : boolean) =>{
      return(
          pages.map(p => {
            return(
              <motion.li key={p._id} variants={variantsChildrenMenu}>
                <Link aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false} tabIndex={isOpened ? 0 : -1} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                  [styles.trirdLevelActive] : `/${route}/${p.alias}` === router.asPath
                })}>
                  {p.category}
                </Link>
              </motion.li>
            );
          })
      );
    };

    return(
        <nav className={styles.menu} role="navigation">
          {announce && <span role="log" className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
          {buildFirstLevel()}
        </nav>
    );
};