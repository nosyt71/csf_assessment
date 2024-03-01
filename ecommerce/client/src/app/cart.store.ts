
// TODO Task 2

import { ComponentStore } from "@ngrx/component-store";
import { CartSlice } from "./cart";
import { LineItem } from "./models";

const INIT_STORE: CartSlice = {
    loadedOn: 0,
    lineItems: []
}

// Use the following class to implement your store
export class CartStore extends ComponentStore<CartSlice> {

    constructor() { super(INIT_STORE) }

    readonly getCart = this.select<LineItem[]>(
        (slice: CartSlice) => slice.lineItems
    )

    readonly getNumberOfLineItems = this.select<number>(
        (slice: CartSlice) => slice.lineItems.length
    )

    readonly addLineItems = this.updater<LineItem>(
        (slice: CartSlice, lineItem: LineItem) => {
            return { 
                loadedOn: slice.loadedOn,
                lineItems: [ ...slice.lineItems, lineItem]
            }
        }
    )
}
