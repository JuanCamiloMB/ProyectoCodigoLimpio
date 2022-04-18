import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';
import { Router } from '@angular/router';
@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductService]
})
export class ProductosComponent implements OnInit {
  @Input() Admin: boolean | undefined;
  public products: Product[];
  public url: string;
  public status: string;
  constructor(
    private _productService: ProductService,
    private _router: Router,
  ) {
    this.products = [];
    this.url = Global.url;
    this.status = "";
  }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
        }
      }
    );
  }
}
