import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { ClassProperties } from './types/class-properties';

@Injectable({
  providedIn: 'root',
})
export class DialogService extends OverlayService {
  protected override readonly config: OverlayConfig = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    panelClass: ['dialog'],
  };

  public override async open<T>(
    component: ComponentType<T>,
    data?: ClassProperties<ComponentType<T>>,
    beforeClose?: () => Promise<boolean>,
  ) {
    const present = await this.present(component, data, beforeClose);

    await this.animationService.appearFromTop(
      this.ref.overlayRef.overlayElement,
    );

    return present;
  }
}
