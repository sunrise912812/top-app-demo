import React from 'react';
import { withLayout } from '@/layout/Layout';
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '@/helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head';
  
function TopPage({ firstCategory, page, products } : TopPageProps) : JSX.Element {

  return <>
  <Head>
      <title>{page.metaTitle}</title>
      <link rel="preconnect" href="https://mc.yandex.ru"/>
      <meta name="description" content={page.metaDescription}/>
      <meta property="og:title" content={page.metaTitle}/>
      <meta property="og:description" content={page.metaDescription}/>
      <meta property="og:type" content="article"/>
  </Head>
      <TopPageComponent page={page} products={products} firstCategory={firstCategory}/>
  </>;
}

export default withLayout(TopPage);

export interface IPathsParams{
  params : {
    alias : string;
    type : string;
  }
}

export const getStaticPaths : GetStaticPaths = async () =>{
    let paths : Array<IPathsParams> = [];
    for (const m of firstLevelMenu){
      const { data : menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory : m.id });
      paths = paths.concat(menu.flatMap(s=> s.pages.map(page=>{
        return(
          { params: { alias: page.alias.toString(), type : m.route.toString() }}
        );
      })));
    }
    return{
        paths,
        fallback : true
    };
};

export const getStaticProps : GetStaticProps<TopPageProps> = async ({ params } : GetStaticPropsContext<ParsedUrlQuery>) =>{
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
  try{
    const { data : menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory : firstCategoryItem.id });
    if (menu.length == 0){
      return{
        notFound : true
      };
    }
    let findPage = false;
    menu.map(m=>m.pages.map(p=>{
      if(p.alias == params.alias){
        findPage = true;
      }
    }));
    if (!findPage){
      return{
        notFound : true
      };
    }
    const {data : page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
    const { data : products } = await axios.post<ProductModel[]>(API.product.find, { 
      category : page.category,
      limit : 10
    });
    return {
      props : {
        menu,
        page,
        products,
        firstCategory : firstCategoryItem.id
      }
    };
  }
  catch{
    return{
      notFound : true
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu : MenuItem[];
  page : TopPageModel;
  products : ProductModel[];
  firstCategory : TopLevelCategory;
}
