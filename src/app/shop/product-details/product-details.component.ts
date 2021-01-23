import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProducts } from 'src/app/shared/models/Products';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProducts;
Quality=1;

  constructor(private shopService: ShopService, private basketService: BasketService) { }

  ngOnInit() {
    this.loadProducts();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.Quality);
  }

  incrementQuantity() {
    this.Quality++;
  }

  decrementQuantity() {
    if (this.Quality > 1) {
      this.Quality--;
    }
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
