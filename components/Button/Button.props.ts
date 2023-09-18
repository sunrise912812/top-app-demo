import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends 
Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>{ /*Omit - исключает свойства из набора, т.к при использовании motion некоторые свойства конфликтуют со стандартными.*/
    children: ReactNode;
    appearance : 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none'; //Данный параметр не обяхательный.
}

//DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> - Пример для параграфа, используем HTMLAttributes так как у параграфа нет специальных атрибутов.