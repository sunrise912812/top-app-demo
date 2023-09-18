import { withLayout } from '@/layout/Layout';
import React from 'react';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from "react";
import { AppContext } from "@/context/app.context";
import { API } from '../../helpers/api';

function Type ({firstCategory, menu} : TypeProps) : JSX.Element {
    const {setMenu} = useContext(AppContext);
    setMenu && setMenu(menu);
    return(
        <>
            Type : {firstCategory}
        </>
    );
}

export default withLayout(Type);

export interface IPathsParams{
    params : {
      type : string;
    }
  }

export const getStaticPaths : GetStaticPaths = async () =>{
    let paths : Array<IPathsParams> = [];
    for (const m of firstLevelMenu){
      paths = paths.concat({ params: { type : m.route.toString() }});
    }
    return{
        paths,
        fallback : true
    };
};

export const getStaticProps : GetStaticProps<TypeProps> = async ({ params } : GetStaticPropsContext<ParsedUrlQuery>) =>{
    
    if(!params){
        return{
            notFound : true
        };
      }
      const firstCategoryItem = firstLevelMenu.find(m=>m.route == params.type);
  if(!firstCategoryItem){
    return{
      notFound : true
    };
  }
    const { data : menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstCategoryItem.id });
    return {
      props : {
        menu,
        firstCategory: firstCategoryItem.id
      }
    };
  };
  
  interface TypeProps extends Record<string, unknown> {
    menu : MenuItem[];
    firstCategory : number;
  }