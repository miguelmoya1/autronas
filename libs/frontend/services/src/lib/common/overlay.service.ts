import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, inject, signal, untracked } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationsService } from './animations.service';
import { ClassProperties } from './types/class-properties';

export abstract class OverlayService {
  public abstract open(
    _: unknown,
    __: unknown,
  ): ReturnType<typeof this.present>;
  public readonly isOpen = signal(false);

  protected abstract readonly config: OverlayConfig;
  protected readonly overlay = inject(Overlay);
  protected readonly animationService = inject(AnimationsService);
  protected declare ref: {
    overlayRef: OverlayRef;
    componentRef: ComponentRef<unknown>;
    backdropClickSubscription: Subscription;
  };

  private declare setTimeoutRef?: number;

  public async hide() {
    if (!this.ref) {
      return;
    }

    if (this.setTimeoutRef) {
      clearTimeout(this.setTimeoutRef);
      this.setTimeoutRef = undefined;
    }

    const { overlayRef, backdropClickSubscription, componentRef } = this.ref;

    const overlay = this.disappear();
    let background: Promise<void> | null = null;

    if (overlayRef.backdropElement) {
      background = this.animationService.disappear(
        overlayRef.backdropElement,
        400,
      );
    }
    await Promise.all([overlay, background]);

    overlayRef.dispose();
    componentRef.destroy();
    backdropClickSubscription.unsubscribe();

    this.isOpen.set(false);
  }

  protected async disappear() {
    this.animationService.disappear(this.ref?.overlayRef.overlayElement);
  }

  protected async present<T>(
    component: ComponentType<T>,
    value?: ClassProperties<ComponentType<T>>,
    beforeClose?: () => Promise<boolean>,
    duration?: number,
  ) {
    if (this.isOpen()) {
      await this.hide();
    }

    const overlayRef = this.overlay.create(this.config);
    const componentRef = overlayRef.attach(new ComponentPortal(component));
    const backdropClickSubscription = overlayRef
      .backdropClick()
      .subscribe(async () => {
        const canClose = beforeClose ? await beforeClose() : true;

        if (canClose) {
          await this.hide();
        }
      });

    if (value) {
      Object.keys(value).forEach((key) =>
        componentRef.setInput(key, value[key as keyof typeof value]),
      );
    }

    this.ref = { overlayRef, componentRef, backdropClickSubscription };

    untracked(() => {
      this.isOpen.set(true);
    });

    if (duration) {
      this.setTimeoutRef = setTimeout(async () => {
        await this.hide();
      }, duration) as unknown as number;
    }

    return {
      componentInstance: componentRef.instance,
    };
  }
}
