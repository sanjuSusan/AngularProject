import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/Pagination';

import { IType } from '../shared/models/productType';
import { IProducts } from '../shared/models/Products';
import { IBrand } from '../shared/models/bands';
import { map } from 'rxjs/operators';
import {ShopParams} from '../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseurl = 'https://localhost:5001/api/';
products: IProducts[] = [];
brands: IBrand[] = [];
types: IType[] = [];

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams)
  {
    let params = new HttpParams();
    if (shopParams.brandId !== 0)
    {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0)
    {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseurl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
      }

      getproduct(id: number)
      {
        return this.http.get<IProducts> (this.baseurl + 'products/' + id);
      }

  getBrands()
  {
    return this.http.get<IBrand[]>(this.baseurl + 'products/brands');
  }
  getTypes()
  {
    return this.http.get<IType[]>(this.baseurl + 'products/types');
  }

}
