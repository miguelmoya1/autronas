import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@autronas/frontend/pipes';

@Component({
  selector: 'autronas-empty-data-table',
  standalone: true,
  template: ` {{ 'NO_DATA' | translate }} `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      padding: 16px;
    }
  `,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyDataTableComponent {}
