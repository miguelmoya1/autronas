import { Component, input } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@autronas/frontend/pipes';

@Component({
  selector: 'autronas-sidenav-button',
  standalone: true,
  imports: [MatIcon, TranslatePipe, RouterLink, MatButton, MatIconButton, MatTooltip],
  template: `
    <div class="nav_item" [routerLink]="routerLink()">
      @if (open() && label()) {
        <button mat-button>
          <mat-icon aria-hidden="false" [fontIcon]="icon()" />
          {{ label()! | translate }}
        </button>
      } @else {
        <button
          mat-icon-button
          [matTooltipDisabled]="!label()"
          [matTooltip]="label()! | translate"
          matTooltipShowDelay="500"
        >
          <mat-icon aria-hidden="false" [fontIcon]="icon()" />
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .nav_item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      cursor: pointer;
    }

    button {
      --mdc-text-button-label-text-color: var(--mdc-icon-button-icon-color);
    }
  `,
})
export class SidenavButtonComponent {
  public readonly open = input.required<boolean>();
  public readonly icon = input.required<string>();

  public readonly label = input<string>();
  public readonly routerLink = input<string[]>();
}
