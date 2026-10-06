import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'

import { Chart, ChartArgs, ChartSettings, create } from '@sebgroup/green-charts'

@Component({
  selector: 'ngg-chart',
  template: ` <div
    class="chart"
    [class.fit-height]="chart?.settings?.style?.fitHeightToParent"
  >
    <div #chartRef [class]="theme"></div>
    @if (chart?.info?.legend; as legend) {
      @if (legend.placement !== 'none') {
        <div class="legend-container" [class]="legend.placement">
          <ul class="legend">
            @for (item of legend.items; track item) {
              <li
                [style.--color]="item.color"
                (mouseover)="chart.focus(item.title)"
                (mouseup)="chart.focus(item.title)"
                (mouseout)="chart.revert()"
              >
                <span>{{ item.title }}</span>
              </li>
            }
          </ul>
        </div>
      }
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NggChartComponent implements AfterViewInit {
  @ViewChild('chartRef') _chartElementRef: ElementRef | undefined
  get chart(): Chart {
    return <Chart>this._chart
  }

  set chart(value: Chart) {
    this._chart = value
  }

  get theme(): string {
    return <string>this._theme
  }

  @Input() set theme(value: string) {
    this._theme = value
  }

  get settings() {
    return this._settings
  }

  @Input() set settings(value) {
    this._settings = value
    if (this.settings && this.settings.data && this._chartElementRef) {
      this.setChart({
        settings: this.settings,
        chartElement: this._chartElementRef?.nativeElement,
      })
    }
  }
  private _theme: string | undefined
  private _settings: ChartSettings | undefined
  private _chart: Chart | undefined

  constructor(private _cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    if (this.settings && this._chartElementRef) {
      this.setChart({
        settings: this.settings,
        chartElement: this._chartElementRef?.nativeElement,
      })
    }
  }

  setChart(args: ChartArgs) {
    this.chart ? this.chart?.update(args) : (this.chart = create(args))
    this._cdr.detectChanges() // manually trigger change detection since we use OnPush Strategy
  }
}
