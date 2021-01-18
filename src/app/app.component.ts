import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducts } from './models/Products';
import { IPagination } from './models/Pagination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  title = 'Skinet';
  products: IProducts[];
  constructor(private http: HttpClient ){}

  ngOnInit(): void {
    this.http.get('https://localhost:44385/api/products?pagesize=50').subscribe(
      (response: IPagination ) => {
      this.products = response.Data;
    }, error => {
      console.log(error);
    } );
  }
}
