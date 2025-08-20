import {
  ChartConfiguration,
  ChartType
} from 'chart.js';

import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics-service';
import { AdminAnalyticsService } from '../../../services/admin-analytics-service';

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
  private translate = inject(TranslateService);
  private adminAnalytics = inject(AdminAnalyticsService);

  // Signals
  analyticsData = signal<any>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.analytics.trackPageView('/admin/dashboard-analytics');
  }


  // Reactive data from AnalyticsService
  // Chart configurations
  salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
        this.translate.instant('January'),
        this.translate.instant('February'),
        this.translate.instant('March'),
        this.translate.instant('April'),
        this.translate.instant('May'),
        this.translate.instant('June'),
        this.translate.instant('July'),
        this.translate.instant('August'),
        this.translate.instant('September'),
        this.translate.instant('October'),
        this.translate.instant('November'),
        this.translate.instant('December')
      ],
    datasets: [
      {
        data: [1200, 1900, 800, 1500, 2000, 1700, 2200, 2500, 3000, 2800, 3200, 3500],
        label: this.translate.instant('Sales'),
        backgroundColor: '#4bc0c0'
      }
    ]
  };
  salesChartType: ChartType = this.translate.instant('bar');

  usersChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      this.translate.instant('Active'),
      this.translate.instant('Inactive')
    ],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };
  usersChartType: ChartType = this.translate.instant('pie');

  productChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Product A'),
      this.translate.instant('Product B'),
      this.translate.instant('Product C'),
      this.translate.instant('Product D'),
      this.translate.instant('Product E'),
      this.translate.instant('Product F')
    ],
    datasets: [
      {
        data: [300, 400, 200, 50, 100, 150],
        label: this.translate.instant('Products Sold'),
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384']
      }
    ]
  };
  productChartType: ChartType = this.translate.instant('bar');


  revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.translate.instant('Week 1'),
      this.translate.instant('Week 2'),
      this.translate.instant('Week 3'),
      this.translate.instant('Week 4'),
    ],
    datasets: [
      {
        data: [5000, 7000, 6000, 8000],
        label: this.translate.instant('Revenue'),
        borderColor: '#FF6384',
        fill: false
      }
    ]
  };
  revenueChartType: ChartType = this.translate.instant('line');

  revenueByCategoryChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      this.translate.instant('Electronics'),
      this.translate.instant('Clothing'),
      this.translate.instant('Home & Kitchen'),
      this.translate.instant('Beauty & Health'),
      this.translate.instant('Sports & Outdoors'),
      this.translate.instant('Automotive'),
      this.translate.instant('Grocery'),
      this.translate.instant('Pet Supplies'),
      this.translate.instant('Jewelry & Accessories'),
      this.translate.instant('Mens'),
      this.translate.instant('Womens'),
      this.translate.instant('Kids')
    ],
    datasets: [
      {
        data: [12000, 3000, 20000, 600, 300, 80000, 700, 200, 15000, 2000, 2500, 900],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCF23', '#4bc0c0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0', '#9966FF', '#FF3F80'
        ],
        label: this.translate.instant('Revenue by Category')
      }
    ]
  };
  revenueByCategoryChartType: ChartType = this.translate.instant('doughnut');

  revenueByTopCategoryChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      this.translate.instant('Home & Kitchen'),
      this.translate.instant('Electronics'),
      this.translate.instant('Automotive'),
      this.translate.instant('Jewelry & Accessories')
    ],
    datasets: [
      {
        data: [20000, 12000, 80000, 15000],
        backgroundColor: ['#FFCF23', '#FF6384', '#FF9F40', '#FFCE56'],
        label: this.translate.instant('Revenue by Top Category')
      }
    ]
  };
  revenueByTopCategoryChartType: ChartType = this.translate.instant('doughnut');

  revenueByMonthChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('January'),
      this.translate.instant('February'),
      this.translate.instant('March'),
      this.translate.instant('April'),
      this.translate.instant('May'),
      this.translate.instant('June'),
      this.translate.instant('July'),
      this.translate.instant('August'),
      this.translate.instant('September'),
      this.translate.instant('October'),
      this.translate.instant('November'),
      this.translate.instant('December')
    ],
    datasets: [
      {
        data: [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000],
        label: this.translate.instant('Revenue by Month'),
        backgroundColor: '#FF6384'
      }
    ]
  };
  revenueByMonthChartType: ChartType = this.translate.instant('bar');

  revenueByYearChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('2020'),
      this.translate.instant('2021'),
      this.translate.instant('2022'),
      this.translate.instant('2023')
    ],
    datasets: [
      {
        data: [50000, 60000, 70000, 80000],
        label: this.translate.instant('Revenue by Year'),
        backgroundColor: '#4bc0c0'
      }
    ]
  };
  revenueByYearChartType: ChartType = this.translate.instant('bar');


  trafficChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.translate.instant('Monday'),
      this.translate.instant('Tuesday'),
      this.translate.instant('Wednesday'),
      this.translate.instant('Thursday'),
      this.translate.instant('Friday'),
      this.translate.instant('Saturday'),
      this.translate.instant('Sunday')
    ],
    datasets: [
      {
        data: [100, 200, 150, 300, 250, 400, 350],
        label: this.translate.instant('Traffic'),
        borderColor: '#4bc0c0',
        fill: false
      }
    ]
  };
  trafficChartType: ChartType = this.translate.instant('line');

  conversionChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      this.translate.instant('Converted'),
      this.translate.instant('Not Converted')
    ],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };
  conversionChartType: ChartType = this.translate.instant('doughnut');

  engagementChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Likes'),
      this.translate.instant('Shares'),
      this.translate.instant('Comments')
    ],
    datasets: [
      {
        data: [300, 150, 200],
        label: this.translate.instant('Engagement'),
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384']
      }
    ]
  };
  engagementChartType: ChartType = this.translate.instant('bar');

  retentionChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.translate.instant('Day 1'),
      this.translate.instant('Day 2'),
      this.translate.instant('Day 3'),
      this.translate.instant('Day 4'),
      this.translate.instant('Day 5'),
      this.translate.instant('Day 6'),
      this.translate.instant('Day 7')
    ],
    datasets: [
      {
        data: [100, 80, 60, 40, 20, 60, 80],
        label: this.translate.instant('Retention Rate'),
        borderColor: '#4bc0c0',
        fill: false
      }
    ]
  };
  retentionChartType: ChartType = this.translate.instant('line');

  satisfactionChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [
      this.translate.instant('Quality'),
      this.translate.instant('Value'),
      this.translate.instant('Support'),
      this.translate.instant('Usability')
    ],
    datasets: [
      {
        data: [4, 5, 3, 4],
        label: this.translate.instant('Satisfaction'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384'
      }
    ]
  };
  satisfactionChartType: ChartType = this.translate.instant('radar');

  feedbackChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: [
      this.translate.instant('Positive'),
      this.translate.instant('Negative'),
      this.translate.instant('Neutral')],
    datasets: [
      {
        data: [60, 20, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  feedbackChartType: ChartType = this.translate.instant('polarArea');

  engagementRateChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.translate.instant('Week 1'),
      this.translate.instant('Week 2'),
      this.translate.instant('Week 3'),
      this.translate.instant('Week 4')
    ],
    datasets: [
      {
        data: [70, 80, 90, 85],
        label: this.translate.instant('Engagement Rate'),
        borderColor: '#4bc0c0',
        fill: false
      }
    ]
  };
  engagementRateChartType: ChartType = this.translate.instant('line');

  trafficSourcesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Organic'),
      this.translate.instant('Direct'),
      this.translate.instant('Referral'),
      this.translate.instant('Social')
    ],
    datasets: [
      {
        data: [500, 300, 200, 100],
        label: this.translate.instant('Traffic Sources'),
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4bc0c0']
      }
    ]
  };
  trafficSourcesChartType: ChartType = this.translate.instant('bar');

  salesByCategoryChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      this.translate.instant('Electronics'),
      this.translate.instant('Clothing'),
      this.translate.instant('Home & Kitchen')
    ],
    datasets: [
      {
        data: [4000, 3000, 2000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  salesByCategoryChartType: ChartType = this.translate.instant('pie');

  userDemographicsChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['18-24', '25-34', '35-44', '45+'],
    datasets: [
      {
        data: [300, 500, 200, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0']
      }
    ]
  };
  userDemographicsChartType: ChartType = this.translate.instant('doughnut');

  userActivityChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Active'),
      this.translate.instant('Inactive')
    ],
    datasets: [
      {
        data: [600, 400],
        label: this.translate.instant('User Activity'),
        backgroundColor: ['#FFCE56', '#36A2EB']
      }
    ]
  };
  userActivityChartType: ChartType = this.translate.instant('bar');

  userEngagementChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.translate.instant('Week 1'),
      this.translate.instant('Week 2'),
      this.translate.instant('Week 3'),
      this.translate.instant('Week 4')
    ],
    datasets: [
      {
        data: [100, 250, 150, 200],
        label: this.translate.instant('User Engagement'),
        borderColor: '#FF6384',
        fill: false
      }
    ]
  };
  userEngagementChartType: ChartType = this.translate.instant('line');

  userRetentionChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [
      this.translate.instant('Day 1'),
      this.translate.instant('Day 2'),
      this.translate.instant('Day 3'),
      this.translate.instant('Day 4'),
      this.translate.instant('Day 5'),
      this.translate.instant('Day 6'),
      this.translate.instant('Day 7')
    ],
    datasets: [
      {
        data: [100, 80, 60, 40, 20, 60, 80],
        label: this.translate.instant('User Retention'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384'
      }
    ]
  };
  userRetentionChartType: ChartType = this.translate.instant('radar');

  userSatisfactionChartData: ChartConfiguration<'polarArea'>['data'] = {
    labels: [
      this.translate.instant('Quality'),
      this.translate.instant('Value'),
      this.translate.instant('Support'),
      this.translate.instant('Usability')],
    datasets: [
      {
        data: [4, 5, 3, 4],
        label: this.translate.instant('User Satisfaction'),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0']
      }
    ]
  };
  userSatisfactionChartType: ChartType = this.translate.instant('polarArea');

  amountSpentChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Week 1'),
      this.translate.instant('Week 2'),
      this.translate.instant('Week 3'),
      this.translate.instant('Week 4')
    ],
    datasets: [
      {
        data: [200, 300, 150, 650],
        label: this.translate.instant('Amount Spent'),
        borderColor: '#4bc0c0',
      }
    ],
  };
  amountSpentChartType: ChartType = this.translate.instant('bar');

  amountSpentYearsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('2020'),
      this.translate.instant('2021'),
      this.translate.instant('2022'),
      this.translate.instant('2023')
    ],
    datasets: [
      {
        data: [500, 800, 700, 400],
        label: this.translate.instant('Amount Spent'),
        borderColor: '#4bc0c0',
      }
    ]
  };
  amountSpentYearsChartType: ChartType = this.translate.instant('bar');

  amountSavedChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('Week 1'),
      this.translate.instant('Week 2'),
      this.translate.instant('Week 3'),
      this.translate.instant('Week 4')
    ],
    datasets: [
      {
        data: [50, 100, 75, 125],
        label: this.translate.instant('Amount Saved'),
        backgroundColor: '#4bc0c0'
      }
    ]
  };
  amountSavedChartType: ChartType = this.translate.instant('bar');

  amountSavedYearsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      this.translate.instant('2020'),
      this.translate.instant('2021'),
      this.translate.instant('2022'),
      this.translate.instant('2023')
    ],
    datasets: [
      {
        data: [300, 400, 250, 100],
        label: this.translate.instant('Amount Saved'),
        backgroundColor: '#4bc0c0'
      }
    ]
  };
  amountSavedYearsChartType: ChartType = this.translate.instant('bar');

}





// If we have really API:

// export class DashboardAnalytics implements OnInit {

//   // inject services
//   private adminAnalytics = inject(AdminAnalyticsService);
//   private translate = inject(TranslateService);

//   // reactive signals
//   loading = signal(true);
//   error = signal<string | null>(null);

//   // charts
//   charts = signal<{ title: string; data: any; type: ChartType; wide?: boolean }[]>([]);

//   ngOnInit() {
//     this.adminAnalytics.loadAnalytics().subscribe({
//       next: data => {
//         this.charts.set([
//           { title: this.translate.instant('Sales'), data: data.salesChart, type: 'bar' },
//           { title: this.translate.instant('Products Sold'), data: data.productsChart, type: 'bar' },
//           { title: this.translate.instant('Sales By Category'), data: data.salesByCategoryChart, type: 'pie' },
//           { title: this.translate.instant('Users'), data: data.usersChart, type: 'pie' },
//           { title: this.translate.instant('User Activity'), data: data.userActivityChart, type: 'bar' },
//           { title: this.translate.instant('User Demographics'), data: data.userDemographicsChart, type: 'doughnut' },
//           { title: this.translate.instant('Revenue'), data: data.revenueChart, type: 'line', wide: true },
//           { title: this.translate.instant('Revenue By Category'), data: data.revenueByCategoryChart, type: 'bar' },
//           { title: this.translate.instant('Revenue By Top Category'), data: data.revenueByTopCategoryChart, type: 'bar' },
//           { title: this.translate.instant('Revenue In Months'), data: data.revenueByMonthChart, type: 'line' },
//           { title: this.translate.instant('Revenue In Years'), data: data.revenueByYearChart, type: 'line' },
//           { title: this.translate.instant('Traffic'), data: data.trafficChart, type: 'bar' },
//           { title: this.translate.instant('Traffic Sources'), data: data.trafficSourcesChart, type: 'pie' },
//           { title: this.translate.instant('Conversion'), data: data.conversionChart, type: 'line' },
//           { title: this.translate.instant('Engagement'), data: data.engagementChart, type: 'bar' },
//           { title: this.translate.instant('Engagement Rate'), data: data.engagementRateChart, type: 'line' },
//           { title: this.translate.instant('User Engagement'), data: data.userEngagementChart, type: 'bar' },
//           { title: this.translate.instant('Retention'), data: data.retentionChart, type: 'line' },
//           { title: this.translate.instant('Satisfaction'), data: data.satisfactionChart, type: 'pie' },
//           { title: this.translate.instant('Feedback'), data: data.feedbackChart, type: 'bar' },
//           { title: this.translate.instant('User Retention'), data: data.userRetentionChart, type: 'bar' },
//           { title: this.translate.instant('User Satisfaction'), data: data.userSatisfactionChart, type: 'doughnut' },
//           { title: this.translate.instant('Amount Spent'), data: data.amountSpentChart, type: 'line' },
//           { title: this.translate.instant('Amount Spent in Years'), data: data.amountSpentYearsChart, type: 'line' },
//           { title: this.translate.instant('Amount Saved'), data: data.amountSavedChart, type: 'bar' },
//           { title: this.translate.instant('Amount Saved in Years'), data: data.amountSavedYearsChart, type: 'bar' },
//         ]);
//         this.loading.set(false);
//       },
//       error: err => {
//         this.error.set(err.message || 'Failed to load analytics');
//         this.loading.set(false);
//       }
//     });
//   }

//   // expose chart types
//   salesChartType: ChartType = 'bar';
//   usersChartType: ChartType = 'pie';
//   productsChartType: ChartType = 'bar';

// }