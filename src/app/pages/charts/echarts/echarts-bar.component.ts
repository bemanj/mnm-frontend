import { observable } from 'rxjs/symbol/observable';
import { SalesReportService } from '../../../@core/data/services/sales/sales-report.service';
import { AfterViewInit, AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, AfterViewChecked, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  day1: number = 1000;
  day2: number = 1000;
  day3;
  day4;
  day5;
  day6;
  day7;

  constructor(private theme: NbThemeService
              , private salesreportservice : SalesReportService) { 
             
               }

  ngAfterViewChecked() {
    // this.loadChart()
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Today'
                  , 'Yesterday'
                  , 'Day 3'
                  , 'Day 4'
                  , 'Day 5'
                  , 'Day 6'
                  , 'Day 7'
          ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Total',
            type: 'bar',
            barWidth: '60%',
            data: [
              56845
              , 48752
              , 50200
              , 21334
              , 20450
              , 36330
              , 68500],
          },
        ],
      };
    });
  }

  ngOnInit() {

    this.d1();
    this.d2();
    // console.log(this.getTotalSalesByDateRange('day1'));
    // console.log(this.sd('day1'));
  }

  d1() {
    // debugger
    this.salesreportservice.getTotalSalesByDateRange('day1')
    .subscribe(data => {
      this.day1 = data
      console.log(this.day1)
    });
    
  }

  d2() {
    // debugger
    this.salesreportservice.getTotalSalesByDateRange('day2')
    .subscribe(data => {
      this.day2 = data
      console.log(this.day2)
    });
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
