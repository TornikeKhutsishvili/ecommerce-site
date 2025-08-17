import {
  ChartConfiguration,
  ChartType
} from 'chart.js';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyticsService } from '../../../services/analytics-service';

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
export class DashboardAnalytics implements OnInit {

  private analytics = inject(AnalyticsService);

  ngOnInit() {

    this.analytics.trackPageView('/products');

    // this.analytics.track('purchase', {
    //   orderId,
    //   revenue: total,
    //   currency: 'USD',
    //   items: order.items.map(i => ({ id: i.productId, q: i.quantity, price: i.price })),
    // }, userId);

  }



  // Reactive data from AnalyticsService
  // Chart configurations
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


  revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { data: [5000, 7000, 6000, 8000], label: 'Revenue', borderColor: '#FF6384', fill: false }]
  };
  revenueChartType: ChartType = 'line';


  trafficChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      { data: [100, 200, 150, 300, 250], label: 'Traffic', borderColor: '#4bc0c0', fill: false }
    ]
  };
  trafficChartType: ChartType = 'line';

  conversionChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Converted', 'Not Converted'],
    datasets: [
      { data: [80, 20], backgroundColor: ['#FF6384', '#36A2EB'] }
    ]
  };
  conversionChartType: ChartType = 'doughnut';

  engagementChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Likes', 'Shares', 'Comments'],
    datasets: [
      { data: [300, 150, 200], label: 'Engagement', backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'] }
    ]
  };
  engagementChartType: ChartType = 'bar';

  retentionChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      { data: [100, 80, 60, 40, 20], label: 'Retention Rate', borderColor: '#4bc0c0', fill: false }
    ]
  };
  retentionChartType: ChartType = 'line';

  satisfactionChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Quality', 'Value', 'Support', 'Usability'],
    datasets: [
      { data: [4, 5, 3, 4], label: 'Satisfaction', backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: '#FF6384' }
    ]
  };
  satisfactionChartType: ChartType = 'radar';

  feedbackChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      { data: [60, 20, 20], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
    ]
  };
  feedbackChartType: ChartType = 'polarArea';

  engagementRateChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { data: [70, 80, 90, 85], label: 'Engagement Rate', borderColor: '#4bc0c0', fill: false }
    ]
  };
  engagementRateChartType: ChartType = 'line';

  trafficSourcesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Organic', 'Direct', 'Referral', 'Social'],
    datasets: [
      { data: [500, 300, 200, 100], label: 'Traffic Sources', backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4bc0c0'] }
    ]
  };
  trafficSourcesChartType: ChartType = 'bar';

  salesByCategoryChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen'],
    datasets: [
      { data: [4000, 3000, 2000], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
    ]
  };
  salesByCategoryChartType: ChartType = 'pie';

  userDemographicsChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['18-24', '25-34', '35-44', '45+'],
    datasets: [
      { data: [300, 500, 200, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0'] }
    ]
  };
  userDemographicsChartType: ChartType = 'doughnut';

  userActivityChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Active', 'Inactive'],
    datasets: [
      { data: [600, 400], label: 'User Activity', backgroundColor: ['#FFCE56', '#36A2EB'] }
    ]
  };
  userActivityChartType: ChartType = 'bar';

  userEngagementChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { data: [100, 150, 200, 250], label: 'User Engagement', borderColor: '#FF6384', fill: false }
    ]
  };
  userEngagementChartType: ChartType = 'line';

  userRetentionChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      { data: [100, 80, 60, 40, 20], label: 'User Retention', backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: '#FF6384' }
    ]
  };
  userRetentionChartType: ChartType = 'radar';

  userSatisfactionChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: ['Quality', 'Value', 'Support', 'Usability'],
    datasets: [
      { data: [4, 5, 3, 4], label: 'User Satisfaction', backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0'] }
    ]
  };
  userSatisfactionChartType: ChartType = 'polarArea';

}