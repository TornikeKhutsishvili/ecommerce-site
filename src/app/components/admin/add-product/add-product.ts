import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss']
})
export class AddProduct {

  productService = inject(ProductService);
  router = inject(Router);

  product = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  saveProduct() {
    // აქ API-ს POST უნდა დაუმატო
    console.log('Adding product:', this.product);
    alert('Product added (frontend only)');
    this.router.navigate(['/admin']);
  }

}
