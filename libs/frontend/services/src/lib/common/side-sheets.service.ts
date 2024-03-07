import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { ClassProperties } from './types/class-properties';

@Injectable({
  providedIn: 'root',
})
export class SideSheetsService extends OverlayService {
  protected override readonly config: OverlayConfig = {
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-dark-backdrop',
    positionStrategy: this.overlay
      .position()
      .global()
      .right('0')
      .top('0')
      .bottom('0'),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    panelClass: ['side-sheets'],
  };

  public override async open<T>(
    component: ComponentType<T>,
    data?: ClassProperties<ComponentType<T>>,
    beforeClose?: () => Promise<boolean>,
  ) {
    const present = await this.present(component, data, beforeClose);

    await this.animationService.appearFromRight(
      this.ref.overlayRef.overlayElement,
    );

    return present;
  }

  protected override async disappear() {
    return this.animationService.disappearToRight(
      this.ref?.overlayRef.overlayElement,
    );
  }
}
