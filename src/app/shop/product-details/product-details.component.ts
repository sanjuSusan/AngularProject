import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/models/Products';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProducts;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.loadProducts();
  }
loadProducts()
{
  this.shopService.getproduct(2).subscribe(products => {   
    this.product = products;
  }, error => {
    console.log(error);
  });
}
}
