import {
  ChartConfiguration,
  ChartType
} from 'chart.js';

import {
  Component,
  inject,
  OnInit
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

  ngOnInit() {
    this.analytics.trackPageView('/admin/dashboard-analytics');
  }


  // Reactive data from AnalyticsService
  // Chart configurations
  salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
        this.translate.instant('Jan'),
        this.translate.instant('Feb'),
        this.translate.instant('Mar'),
        this.translate.instant('Apr'),
        this.translate.instant('May'),
        this.translate.instant('Jun'),
        this.translate.instant('Jul'),
        this.translate.instant('Aug'),
        this.translate.instant('Sep'),
        this.translate.instant('Oct'),
        this.translate.instant('Nov'),
        this.translate.instant('Dec')
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
        data: [100, 150, 200, 250],
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

}