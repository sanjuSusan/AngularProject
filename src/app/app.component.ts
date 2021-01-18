import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  title = 'Skinet';
  products: any[];
  constructor(private http: HttpClient ){}

  ngOnInit(): void {
    this.http.get('https://localhost:44385/api/products?pagesize=50').subscribe((response: any ) => {
      this.products = response.data;
    }, error => {
      console.log(error);
    } );
  }
}
