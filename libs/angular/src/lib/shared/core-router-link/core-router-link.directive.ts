import { LocationStrategy } from '@angular/common'
import {
  Directive,
  ElementRef,
  OnChanges,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'

/**
 * @deprecated No longer needed when using components from `@sebgroup/green-core-ng`
 */
@Directive({
  selector: '[nggCoreRouterLink]',
  standalone: false,
})
export class NggCoreRouterLinkDirective implements OnChanges {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Self() @Optional() private routerLink?: RouterLink,
    @Self() @Optional() private routerLinkActive?: RouterLinkActive,
    @Optional() private router?: Router,
    @Optional() private locationStrategy?: LocationStrategy,
  ) {
    this.routerLinkActive?.isActiveChange.subscribe(() => this.setActive())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routerLink']) {
      this.updateHref()
    }
  }

  ngAfterViewInit(): void {
    this.updateHref()
    this.setActive()
  }

  private setActive(): void {
    if (
      this.routerLinkActive &&
      this.elementRef.nativeElement?.tagName.includes('GDS-MENU-BUTTON')
    ) {
      this.elementRef.nativeElement.selected = this.routerLinkActive.isActive
    }
  }

  private updateHref(): void {
    const urlTree = this.routerLink?.urlTree
    const href =
      urlTree && this.router
        ? (this.locationStrategy?.prepareExternalUrl(
            this.router.serializeUrl(urlTree),
          ) ?? '')
        : ''

    this.renderer.setAttribute(this.elementRef.nativeElement, 'href', href)
  }
}
