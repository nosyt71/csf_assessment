import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem, Product} from '../models';
import { CartStore } from '../cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)

  @Input() selectedProduct!: Product;

  @Input({ required: true })
  productId!: string

  @Input({ required: true })
  productName!: string

  @Input({ required: true})
  productPrice!: number

  form!: FormGroup 
  lineItems$!: Observable<LineItem[]>;

  @Output()
  lineCount$!: Observable<number>;

  ngOnInit(): void {
    this.form = this.createForm()
    this.lineItems$ = this.cartStore.getCart
    this.lineCount$ = this.cartStore.getNumberOfLineItems
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.productName,
      price: this.productPrice
    }
    this.cartStore.addLineItems(lineItem)
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
