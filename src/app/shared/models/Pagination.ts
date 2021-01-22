import {IProducts} from './Products';

export interface IPagination {
    PageIndex: number;
    PageSize: number;
    Count: number;
    data: IProducts[];
}
