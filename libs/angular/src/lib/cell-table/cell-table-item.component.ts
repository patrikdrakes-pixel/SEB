import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { TableHeaderListValueType } from './cell-table.types'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[nggCellTableItem]',
  template: `
    @switch (valueType) {
      @case ('string') {
        <span>{{ row || '–' }}</span>
      }
      @case ('number') {
        <span>{{ (row | number) || '–' }}</span>
      }
      @case ('datetime') {
        <span>{{ (row | date: 'HH:mm:ss') || '–' }}</span>
      }
      @case ('date') {
        <span>{{ (row | date: 'YYYY-MM-dd') || '–' }}</span>
      }
      @case ('custom-html') {
        <span [innerHtml]="transformHTML(row) || '–'"></span>
      }
      @case ('sign') {
        <span [ngClass]="getSignColor(row)">{{ row || '–' }}</span>
      }
      @case ('pct') {
        <span>{{ row || '–' }}</span>
      }
      @case ('streamSign') {
        <span [nggSlidingUnderline]="row">{{ row || '–' }}</span>
      }
      @default {
        <span>–</span>
      }
    }
  `,
  standalone: false,
})
export class CellTableItemComponent {
  @Input() row: any
  @Input() valueType: TableHeaderListValueType = 'string'
  @Input() id = ''

  constructor(private sanitizer: DomSanitizer) {}

  getSignColor = (value: string | number) => {
    if (/[−-]/.test(String(value))) return 'text-danger'
    else if (/[1-9]/.test(String(value))) return 'text-success'
    return ''
  }

  transformHTML(value: string): SafeHtml {
    if (value && value.length) {
      return this.sanitizer.bypassSecurityTrustHtml(value)
    } else {
      return ''
    }
  }
}
