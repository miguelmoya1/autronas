import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sv-screen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content /> `,
  styleUrl: './screen.component.css',
})
export class ScreenComponent {}
