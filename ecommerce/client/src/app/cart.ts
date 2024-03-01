import { LineItem } from "./models"

export interface CartSlice {
    loadedOn: number
    lineItems: LineItem[]
}