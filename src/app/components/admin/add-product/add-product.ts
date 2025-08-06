import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';
import { AddToasts } from "../../toasts/add-toasts/add-toasts";
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss']
})
export class AddProduct {

  productService = inject(ProductService);
  router = inject(Router);

  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;

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
