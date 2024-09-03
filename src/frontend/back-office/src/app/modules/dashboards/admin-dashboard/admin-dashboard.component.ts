import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Table, TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChartModule} from "primeng/chart";
import {RatingModule} from "primeng/rating";
import {KnobModule} from "primeng/knob";
import {Subscription} from "rxjs";
import {LayoutService} from "../../../layout/service/app.layout.service";
interface InventoryStatus {
  label: string;
  value: string;
}
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: InventoryStatus;
  category?: string;
  image?: string;
  rating?: number;
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    RatingModule,
    KnobModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  knobValue: number = 7;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: Product[] = [];

  subscription: Subscription;

  cols: any[] = [];

  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.initCharts();
    });
  }

  ngOnInit(): void {
    this.weeks = [{
      label: 'Last Week',
      value: 0,
      data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
    },
      {
        label: 'This Week',
        value: 1,
        data: [[35, 19, 40, 61, 16, 55, 30], [48, 78, 10, 29, 76, 77, 10]]
      }];

    this.selectedWeek = this.weeks[0];
    this.initCharts();
    this.products=[]

    this.cols = [
      {header: 'Name', field: 'name'},
      {header: 'Category', field: 'category'},
      {header: 'Price', field: 'price'},
      {header: 'Status', field: 'inventoryStatus'}
    ]
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          barThickness: 12,
          borderRadius: 12,
          data: this.selectedWeek.data[0]
        },
        {
          label: 'Profit',
          backgroundColor: documentStyle.getPropertyValue('--primary-200'),
          barThickness: 12,
          borderRadius: 12,
          data: this.selectedWeek.data[1]
        }
      ]
    };

    this.pieData = {
      labels: ['Electronics', 'Fashion', 'Household'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-700'),
            documentStyle.getPropertyValue('--primary-400'),
            documentStyle.getPropertyValue('--primary-100')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--primary-600'),
            documentStyle.getPropertyValue('--primary-300'),
            documentStyle.getPropertyValue('--primary-200')
          ]
        }
      ]
    };

    this.barOptions = {
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            font: {
              weight: 700,
            },
            padding: 28
          },
          position: 'bottom'
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.pieOptions = {
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            font: {
              weight: 700,
            },
            padding: 28
          },
          position: 'bottom'
        }
      }
    };
  }

  onWeekChange() {
    let newBarData = {...this.barData};
    newBarData.datasets[0].data = this.selectedWeek.data[0];
    newBarData.datasets[1].data = this.selectedWeek.data[1];
    this.barData = newBarData;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
