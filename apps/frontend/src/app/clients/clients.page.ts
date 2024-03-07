import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { SideSheetsService } from '@autronas/frontend/services';
import { ClientsTableView, ClientsTitleView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-clients-page',
  standalone: true,
  imports: [ClientsTitleView, ClientsTableView],
  template: `
    <autronas-clients-title-view />

    <autronas-clients-table-view />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsPage {
  private readonly newClient = input(false, { transform: booleanAttribute });
  private readonly sideSheet = inject(SideSheetsService);
  private readonly router = inject(Router);
  private firstLoad = true;

  constructor() {
    effect(() => {
      const isOpen = this.sideSheet.isOpen();

      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }

      if (!isOpen) {
        this.router.navigate(['/clients']);
      }
    });

    effect(() => {
      const newClient = this.newClient();

      untracked(() => {
        if (newClient && !this.sideSheet.isOpen()) {
          this.sideSheet.open(Clients2Page);
        }
      });
    });
  }
}

export default ClientsPage;

@Component({
  selector: 'autronas-clients-page',
  standalone: true,
  template: ` holaaa `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Clients2Page {}
