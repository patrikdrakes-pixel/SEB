import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Observable, of } from 'rxjs'

// eslint-disable-next-line
import { SegmentedControl } from '@sebgroup/green-angular'

@Component({
    templateUrl: './segmented-control.component.html',
    styleUrls: ['./segmented-control.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SegmentedControlComponent {
  $controls: Observable<Array<SegmentedControl>> = of([
    { url: './option-a', text: 'Option A' },
    { url: './option-b', text: 'Option B' },
  ])
}
