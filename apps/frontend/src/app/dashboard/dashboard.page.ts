import { Component } from '@angular/core';

@Component({
  selector: 'autronas-dashboard',
  standalone: true,
  imports: [],
  template: `<p>dashboard works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DashboardPage {}

export default DashboardPage;
