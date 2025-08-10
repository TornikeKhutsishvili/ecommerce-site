import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProductList } from "../products/product-list/product-list";
import { Carusel } from "../carusel/carusel";
import { ProductService } from '../../services/product-service';
import { dummyProductModel } from '../../models/product.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductList,
    Carusel,
    TranslateModule
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, OnDestroy {

  // variables
  carouselProducts = signal<dummyProductModel[]>([]);
  allProducts = signal<dummyProductModel[]>([]);

  private router = inject(Router);
  private productService = inject(ProductService);
  private routerSub!: Subscription;


  // ngOnInit
  ngOnInit() {

    this.loadData();

    this.routerSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });

  }



  // load Data
  private loadData() {
    // All products
    this.productService.getProducts().subscribe(data => {
      this.allProducts.set(data);
    });

    // Carousel
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });

    // load random carousel
    this.loadRandomCarousel();
  }



  // random carousel
  loadRandomCarousel() {
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });
  }


  // ngOnDestroy
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

}