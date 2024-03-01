import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'dexie';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { LineItem } from '../models';
import { CartStore } from '../cart.store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {

  // TODO Task 3
  private fb = inject(FormBuilder)
  private productSvc = inject(ProductService)
  private router = inject(Router)
  private cartStore = inject(CartStore)
  form!: FormGroup
  createOrderSub?: Subscription
  lineCount$!: Observable<number>
  lineItems$!: Observable<LineItem[]>
  totalPrice$!: Observable<number>

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })

    this.lineItems$ = this.cartStore.getCart
    
    this.totalPrice$ = this.lineItems$.pipe(
      map(lineItems => lineItems.reduce((total, item) => total + item.price * item.quantity, 0))
    );
  }

  ngOnDestroy(): void {
      this.createOrderSub?.unsubscribe()
  }

onSubmit() {
  const formData = this.form.value;
  this.createOrderSub = this.lineItems$.subscribe(lineItems => {
    const cart = lineItems;
    this.productSvc.checkout({ ...formData, cart }).subscribe({
      next: order => {
        this.router.navigate(['/']).then(() => alert((order as any).orderId))
      },
      error: err => alert(err.message)
    });
  });
}
}

