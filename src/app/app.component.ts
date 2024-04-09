import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../services/theme.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    NavbarComponent,
    MatSlideToggleModule,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.updateTheme();
  }
}
