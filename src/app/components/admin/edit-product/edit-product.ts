import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.scss']
})
export class EditProduct {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<any>({});

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(product => {
      this.product.set(product);
    });
  }

  updateProduct() {
    console.log('Updating product:', this.product());
    alert('Product updated (frontend only)');
    this.router.navigate(['/admin']);
  }

}