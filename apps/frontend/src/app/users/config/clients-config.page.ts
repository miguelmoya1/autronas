import { Component } from '@angular/core';
import { UserConfigView } from '@autronas/frontend/views';

@Component({
  selector: 'autronas-clients-config-page',
  standalone: true,
  template: ` <autronas-user-config-view /> `,
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [UserConfigView],
})
export class ClientsConfigPage {}

export default ClientsConfigPage;
