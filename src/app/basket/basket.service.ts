import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/baskets';
import { IProducts } from '../shared/models/Products';

@Injectable({
  providedIn: 'root'
})

export class BasketService {

  baseUrl = environment.apiurl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
        );
    }

    setBasket(basket: IBasket) {
      return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
        }, error => {
        console.log(error);
      });
    }
    getCurrentBasketValue() {
      return this.basketSource.value;
    }

    addItemToBasket(items: IProducts, Quality = 1) {
      console.log(items.ProductType);
      const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(items, Quality);
      let basket = this.getCurrentBasketValue();
      console.log(basket);
      if (basket === null) {
        basket = this.createBasket();
      }
      console.log(basket);
      basket.Item = this.addOrUpdateItem(basket.Item, itemToAdd, Quality);
      this.setBasket(basket);
    }
    incrementItemQuantity(items: IBasketItem) {
      const basket = this.getCurrentBasketValue();
      const foundItemIndex = basket.Item.findIndex(x => x.Id === items.Id);
      basket.Item[foundItemIndex].Quality++;
      this.setBasket(basket);
    }
    decrementItemQuantity(items: IBasketItem) {
      const basket = this.getCurrentBasketValue();
      const foundItemIndex = basket.Item.findIndex(x => x.Id === items.Id);
      if (basket.Item[foundItemIndex].Quality > 1) {
        basket.Item[foundItemIndex].Quality--;
        this.setBasket(basket);
      } else {
        this.removeItemFromBasket(items);
      }
    }
    removeItemFromBasket(items: IBasketItem) {
      const basket = this.getCurrentBasketValue();
      if (basket.Item.some(x => x.Id === items.Id)) {
        basket.Item = basket.Item.filter(i => i.Id !== items.Id);
        if (basket.Item.length > 0) {
          this.setBasket(basket);
        } else {
          this.deleteBasket(basket);
        }
      }
    }
    deleteBasket(basket: IBasket) {
      return this.http.delete(this.baseUrl + 'basket?id=' + basket.Id).subscribe(() => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }, error => {
        console.log(error);
      });
    }

    private createBasket(): IBasket {
      const basket = new Basket();
      localStorage.setItem('basket_id', basket.Id);
      return basket;
    }
    private addOrUpdateItem(item: IBasketItem[], itemToAdd: IBasketItem, Quality: number): IBasketItem[] {
           const index = item.findIndex(i => i.Id === itemToAdd.Id);
           if (index === -1) {
        itemToAdd.Quality = Quality;
        item.push(itemToAdd);
      } else {
        item[index].Quality += Quality;
      }
           return item;
    }

    private mapProductItemToBasketItem(items: IProducts, Quality: number): IBasketItem {
     console.log(items.id);
     return {
        Id: items.id,
        ProductName: items.name,
        Price: items.price,
        PictureUrl: items.pictureUrl,
        Quality,
        Brand: items.ProductBrand,
        Type: items.ProductType
      };
    }

    private calculateTotals() {
      const basket = this.getCurrentBasketValue();
      const shipping = this.shipping;
      const subtotal = basket.Item.reduce((a, b) => (b.Price * b.Quality) + a, 0);
      const total = subtotal + shipping;
      this.basketTotalSource.next({shipping, total, subtotal});
    }
}
