import { SortEnum } from "@/components/Sort/Sort.props";
import { ProductModel } from "@/interfaces/product.interface";

export type SortActions = {type : SortEnum.Raiting} | {type : SortEnum.Price} | {type : 'reset', intitialState : ProductModel[]};

export interface SortReducerState {
    sort : SortEnum;
    products : ProductModel[];
}

export const sortReducer = (state : SortReducerState, action : SortActions) : SortReducerState => {
    switch(action.type){
        case SortEnum.Raiting:
            return {
                sort : SortEnum.Raiting,
                products : state.products.sort((a, b)=> a.initialRating > b.initialRating ? -1 : 1) /*Если -1 то вниз опускаем, если 1 то вверх, от большего к меньшему*/
            };
        case SortEnum.Price:
            return {
                sort : SortEnum.Price,
                products : state.products.sort((a, b)=> a.price > b.price ? 1 : -1) /*От меньшего к большему*/
            };
        case 'reset':
            return{
                sort : SortEnum.Raiting,
                products : action.intitialState
            };
        default:
            throw new Error('Не верный тип сортировки');

    }
};