import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'sv-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [disabled]="disabled()">
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  public readonly disabled = input<boolean>();
}
