import { Component, inject, Inject, signal } from '@angular/core';
import { ProductService } from '../product';
import { Product } from '../models/product.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-products',
  imports: [NgFor,NgTemplateOutlet,NgClass,NgIf],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  constructor() {}

  productService=inject(ProductService);

  productList=toSignal(this.productService.getProducts(),{initialValue:{products:[]}})
  
  private destroy$=new Subject<boolean>();

  ngOnInit(){
    // this.productService.getProducts().pipe(
    //   tap((list:{products:Product[]})=>{
    //     console.log("Products received");
    //     this.productList.set(list.products);
    //   }),
    //   takeUntil(this.destroy$)
    // ).subscribe();
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
