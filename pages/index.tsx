import React, { useState, useEffect } from 'react';
import { Htag } from "@/components";
import { Button } from "@/components";
import { Ptag } from "@/components";
import { Tag } from "@/components";
import { Raiting } from '@/components';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { Input } from "@/components";
import { TextArea } from "@/components";
import { API } from '../helpers/api';
  
function Home({ menu } : HomeProps) : JSX.Element {

  const [raiting, setRaiting] = useState<number>(3);
  const [counter, setCounter] = useState<number>(0);

  useEffect(()=>{
    if(counter>0){
      console.log(counter);
    }
    
    return function cleanup(){
      console.log('Unmount');
    };
  });

  useEffect(()=>{
    console.log('Mounted');
  },[]);

  return (
    <>
        <Htag tag='h1'>{counter}</Htag>
        <Button appearance="primary" arrow='down' onClick={()=>setCounter(prev=>prev+1)}>Кнопка</Button>
        <Button appearance="ghost" arrow='right'>Кнопка</Button>
        <Ptag size="s">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis similique a molestias nostrum ullam sint in assumenda odio blanditiis placeat hic, explicabo incidunt provident omnis. Voluptas eius nulla quis dolorem, nisi minus. Illo aut natus maiores ab. Nostrum consectetur facere nobis, velit vitae, fugiat minima iure quas, veniam culpa ipsam.</Ptag>
        <Ptag>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aperiam voluptates ut ipsam maxime fugiat vero blanditiis fuga nemo culpa?</Ptag>
        <Ptag size='l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dolore.</Ptag>
        <Tag size='m' color='gray'>10</Tag>
        <Tag size='s'>Photoshop</Tag>
        <Tag size='m' color='red' href='https://hh.ru/'>hh.ru</Tag>
        <Tag size='s' color='primary'>Подготовка макетов</Tag>
        <Tag size='s' color='green'>-10 000 ₽</Tag>
        <Raiting raiting={raiting} isEditable={true} setRaiting={setRaiting}/>
        <Input placeholder='Test'/>x
        <TextArea placeholder='TextArea'/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps : GetStaticProps<HomeProps> = async () =>{
  const firstCategory = 0;
  const { data : menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
  return {
    props : {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu : MenuItem[];
  firstCategory : number;
}
