import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@autronas/app/pipes';

@Component({
  selector: 'autronas-sidenav-view',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  imports: [MatIcon, MatDrawer, MatIconButton, TranslatePipe, RouterLink],
})
export class SidenavView {}
