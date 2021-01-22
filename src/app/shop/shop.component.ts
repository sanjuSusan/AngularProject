import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/bands';
import { IProducts } from '../shared/models/Products';
import { IType } from '../shared/models/productType';
import {ShopParams} from '../shared/models/shopParams';


import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProducts[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalcount: number;
brandIdSelected = 0;
typeIdSelected = 0;
  SortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value:'name'},
    {name: 'Price:Low to High', value: 'priceAsc'},
    {name: 'Price:High to Low', value: 'priceDesc'},
  ];
  constructor(private shopservice: ShopService ){}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopservice.getProducts(this.shopParams).subscribe(Response => {
      this.products = Response.data;
    }, error => {
      console.log(error);
    });
  }
  getBrands() {
    this.shopservice.getBrands().subscribe(response => {
      this.brands = [{Id: 0, Name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopservice.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
   this.shopParams.brandId = brandId;
   this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  onSortSelected(sort: string) {
   this.shopParams.sort = sort;
   this.getProducts();
  }
  onPageChanged(event: any) {
  this.shopParams.pageNumber= event.page;
  this.getProducts();
    }
    onSearch() {
      // const params = this.shopService.getShopParams();
      // params.search = this.searchTerm.nativeElement.value;
      // params.pageNumber = 1;
      // this.shopService.setShopParams(params);
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.getProducts();
    }
    onReset() {
      // this.searchTerm.nativeElement.value = '';
      // this.shopParams = new ShopParams();
      // this.shopService.setShopParams(this.shopParams);
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }

}
