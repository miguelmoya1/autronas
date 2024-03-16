import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientsCreateView, ClientsTableView, ClientsTitleView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-clients-new-page',
  standalone: true,
  template: ` <autronas-clients-create-view /> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClientsTitleView, ClientsTableView, ClientsCreateView],
})
export class ClientsNewPage {}

export default ClientsNewPage;
