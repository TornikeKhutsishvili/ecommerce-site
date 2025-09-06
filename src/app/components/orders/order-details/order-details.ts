import {
  PLATFORM_ID,
  Inject,
  OnInit,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { OrderService } from '../../../services/orders-service';
import { Order } from '../../../interfaces/order.interface';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.scss']
})
export class OrderDetails implements OnInit {

  // inject
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // variables
  order: Order | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrder(orderId).subscribe(res => {
        this.order = res;
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const orderId = this.route.snapshot.paramMap.get('id');
      if (orderId) {
        this.orderService.getOrder(orderId).subscribe(res => {
          this.order = res;
        });
      } else {
        this.router.navigate(['/orders']);
      }
    }
  }


  downloadPDF() {
    if (!this.order) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Invoice - Order #${this.order.id}`, 10, 20);

    doc.setFontSize(12);
    doc.text(`Status: ${this.order.status}`, 10, 30);
    doc.text(`Subtotal: ${this.order.subtotal}`, 10, 40);
    doc.text(`Shipping: ${this.order.shipping}`, 10, 50);
    doc.text(`Total: ${this.order.total}`, 10, 60);

    doc.text('Shipping Address:', 10, 70);
    doc.text(`${this.order.address.fullName}`, 10, 80);
    doc.text(`${this.order.address.line1}, ${this.order.address.city}, ${this.order.address.country}`, 10, 90);
    doc.text(`${this.order.address.zip}`, 10, 100);
    doc.text(`${this.order.address.phone}`, 10, 110);

    let y = 120;
    doc.text('Items:', 10, y);
    this.order.items.forEach(item => {
      y += 10;
      doc.text(`${item.title} × ${item.quantity} - ${item.price}`, 10, y);
    });

    doc.save(`Order-${this.order.id}.pdf`);
  }

  downloadPDFfromHTML() {
    const element = document.getElementById('order-details');
    if (!element) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Order-${this.order?.id}.pdf`);
    });
  }

}