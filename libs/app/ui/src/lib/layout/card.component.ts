import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'sv-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styleUrl: './card.component.css',
})
export class CardComponent {
  public readonly type = input<'red' | 'green'>();
  public readonly selected = input<boolean>();

  @HostBinding('class')
  get hostClass() {
    return this.type();
  }

  @HostBinding('class.selected')
  get hostSelected() {
    return this.selected();
  }
}
