import {v4 as uuidv4} from 'uuid';

export interface IBasket {
    Id: string;
    Item: IBasketItem[];
  }
export interface IBasketItem {
    Id: number;
    ProductName: string;
    Price: number;
    Quality: number;
    PictureUrl: string;
    Type: string;
   Brand: string;
}
export  class Basket implements IBasket
{
    Id = uuidv4();
    Item: IBasketItem[] = [];
}
export interface IBasketTotals{
  shipping: number;
  subtotal: number;
  total: number;
}



