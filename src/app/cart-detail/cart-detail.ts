import {  afterNextRender, Component } from '@angular/core';
import { Cart } from '../cart';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { CartData, Product } from '../models/cart.model';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { RoundOffPipe } from '../round-off-pipe';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../profile';

@Component({
  selector: 'app-cart-detail',
  imports: [CommonModule, NgIf, NgFor, NgTemplateOutlet, RoundOffPipe, ReactiveFormsModule],
  standalone: true,
  templateUrl: './cart-detail.html',
  styleUrl: './cart-detail.scss',
})
export class CartDetail {

  constructor(private cartService: Cart,private profileService:ProfileService) { }

  carts$!: Observable<CartData[]>;

  cartSummary: Product[] = [];

  totalCost: number = 0;

  get cartDetail(): AbstractControl[] {
    return (<FormArray>this.cartSelectionForm.get('selections')).controls;
  }

  get productDetails(): AbstractControl[] {
    return (<FormArray>(<FormGroup>(<FormArray>this.cartSelectionForm.get('selections')).at(0)).get('products')).controls || [];
  }

  cartSelectionForm = new FormGroup({
    selections: new FormArray<any>([])
  })

  ngOnInit() {
    this.cartSelectionForm.valueChanges.subscribe((result) => {
      this.cartSummary = result.selections[0].products.filter((x: any) => x.selected);
      this.totalCost = this.cartSummary.reduce((acc: number, curr) => {
        acc = acc + curr.price;
        return acc;
      }, 0)
    })
    
    this.fetchCartsForUser();
  }

  fetchCartsForUser() {
   this.carts$= this.profileService.getCurrentUser().pipe(
    mergeMap((userId:string|null)=>{
      if(userId){
       return  this.cartService.getCarts(parseInt(userId)).pipe(
        map((result: { carts: CartData[] }) => {
          console.log(result.carts);
          return result.carts;
        }),
        tap((carts: CartData[]) => {
          carts.forEach((cart) => {
            (<FormArray>this.cartSelectionForm.get('selections')).push(this.createCartGroup(cart));
          })
        })
      )
      }
      return of([]);
    })
   )
  }

  createCartGroup(cart: CartData) {
    return new FormGroup({
      cartId: new FormControl(cart.id),
      products: new FormArray(cart.products.map(product => this.createProductGroup(product)))
    })
  }

  createProductGroup(product: Product) {
    return new FormGroup({
      id: new FormControl(product.id),
      title: new FormControl(product.title),
      price: new FormControl(product.price),
      quantity: new FormControl(product.quantity),
      total: new FormControl(product.total),
      discountPercentage: new FormControl(product.discountPercentage),
      discountedTotal: new FormControl(product.discountedTotal),
      thumbnail: new FormControl(product.thumbnail),
      selected: new FormControl(true)
    })
  }

}
