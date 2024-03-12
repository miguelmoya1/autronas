import { AnimationBuilder, AnimationFactory, animate, style } from '@angular/animations';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  private readonly animationBuilder = inject(AnimationBuilder);

  public async appearFromTop(element: HTMLElement, time = 200) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0, transform: 'translateY(-100%)' }),
      animate(`${time}ms ease-in-out`, style({ opacity: 1, transform: 'translateY(0)' })),
    ]);

    await this.playAnimation(animation, element);
  }

  public async appearFromBottom(element: HTMLElement, time = 200) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0, transform: 'translateY(100%)' }),
      animate(`${time}ms ease-in-out`, style({ opacity: 1, transform: 'translateY(0)' })),
    ]);

    await this.playAnimation(animation, element);
  }

  public async appearFromRight(element: HTMLElement, time = 200) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0, transform: 'translateX(100%)' }),
      animate(`${time}ms ease-in-out`, style({ opacity: 1, transform: 'translateX(0)' })),
    ]);

    await this.playAnimation(animation, element);
  }

  public async disappearToRight(element: HTMLElement, time = 200) {
    const animation = this.animationBuilder.build([
      animate(`${time}ms ease-in-out`, style({ opacity: 0, transform: 'translateX(100%)' })),
    ]);

    await this.playAnimation(animation, element);
  }

  public async disappear(element: HTMLElement, time = 200) {
    const animation = this.animationBuilder.build([animate(`${time}ms ease-in-out`, style({ opacity: 0 }))]);

    await this.playAnimation(animation, element);
  }

  private async playAnimation(animationFactory: AnimationFactory, htmlElement: HTMLElement) {
    return new Promise<void>((resolve) => {
      const player = animationFactory.create(htmlElement);
      player.play();
      player.onDone(() => {
        resolve();
      });
    });
  }
}
