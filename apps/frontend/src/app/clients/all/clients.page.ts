import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class ClientsPage {}

export default ClientsPage;
