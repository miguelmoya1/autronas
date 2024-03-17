import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientsEditView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-client-edit-page',
  standalone: true,
  template: ` <autronas-clients-edit-view /> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClientsEditView],
})
export class ClientsEditPage {}

export default ClientsEditPage;
