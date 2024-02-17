import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'sv-hr',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="sv-hr" [ngClass]="{ 'sv-hr-vertical': vertical() }"></div> `,
  styleUrl: './hr.component.css',
  imports: [NgClass],
})
export class HrComponent {
  public readonly vertical = input<boolean>();
}
