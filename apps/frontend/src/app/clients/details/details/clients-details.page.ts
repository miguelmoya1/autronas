import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientsDetailsView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-client-detail-page',
  standalone: true,
  template: ` <autronas-clients-detail-view /> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClientsDetailsView],
})
export class ClientsDetailsPage {}

export default ClientsDetailsPage;
