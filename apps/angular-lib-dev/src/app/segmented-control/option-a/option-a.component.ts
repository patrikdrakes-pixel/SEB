import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
    template: ` <p>Option A</p> `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OptionAComponent {}
