import { Component, OnInit,Input } from '@angular/core';
import { IProducts } from 'src/app/shared/models/Products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

@Input() product: IProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
