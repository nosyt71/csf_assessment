import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { LineItem, Product } from './models';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)

  selectedProduct!: Product;

  itemCount$!: Observable<number>
  lineItem$!: Observable<LineItem[]>

  receiveProduct(product: Product): void {
    this.selectedProduct = product;
  }

  receiveLineItems(lineItem: LineItem): void {
  }

  ngOnInit(): void {
    this.itemCount$ = this.cartStore.getNumberOfLineItems
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
