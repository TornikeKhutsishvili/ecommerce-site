import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts,
    DeleteToasts,
    AddToasts
],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.scss']
})
export class EditProduct {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<any>({});


  // All ViewChild
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  // ngOnInit
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
      },
      error: () => {
        this.alertToast.openToast('not found products');
      }
    });
  }


  // update product
  updateProduct() {
    const prod = this.product();

    if (!prod.title || !prod.price) {
      this.alertToast.openToast('not update');
      return;
    }

    console.log('Updating product:', prod);
    this.acceptToast.openToast(`Updating product: ${prod}`);
    this.router.navigate(['/admin']);
  }

}