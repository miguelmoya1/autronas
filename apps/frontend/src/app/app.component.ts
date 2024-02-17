import { Component, OnInit } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidenavView } from '@autronas/app/views';

@Component({
  selector: 'autronas-root',
  standalone: true,
  template: `
    <mat-drawer-container autosize>
      <autronas-sidenav-view />

      <router-outlet />
    </mat-drawer-container>
  `,
  styles: `
    mat-drawer-container {
      height: 100%;
      width: 100%;
    }
  `,
  imports: [RouterOutlet, MatDrawerContainer, SidenavView],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  async ngOnInit() {
    // when the user change the theme, we update the body class (with prefer-color-scheme)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          document.body.className = 'dark-theme';
        } else {
          document.body.className = 'light-theme';
        }
      });

    // set the initial theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = 'light-theme';
    }
  }
}
