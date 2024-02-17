import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sv-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content /> `,
  styleUrl: './panel.component.css',
})
export class PanelComponent {}
