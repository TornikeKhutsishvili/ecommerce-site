import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    NgChartsModule,
  ],
  templateUrl: './dashboard-analytics.html',
  styleUrls: ['./dashboard-analytics.scss']
})
export class DashboardAnalytics {

  salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { data: [1200, 1900, 800, 1500], label: 'Sales', backgroundColor: '#4bc0c0' }
    ]
  };
  salesChartType: ChartType = 'bar';

  usersChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Active', 'Inactive'],
    datasets: [
      { data: [300, 50], backgroundColor: ['#36A2EB', '#FF6384'] }
    ]
  };
  usersChartType: ChartType = 'pie';

  productChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      { data: [400, 300, 200], label: 'Products Sold', backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'] }
    ]
  };
  productChartType: ChartType = 'bar';


}
