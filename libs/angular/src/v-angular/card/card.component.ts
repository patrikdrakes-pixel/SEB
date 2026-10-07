import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
    selector: 'nggv-card',
    template: ` <ng-content></ng-content> `,
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NggvCardComponent {}
