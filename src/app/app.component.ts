import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../services/theme.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { Router } from '@angular/router';
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
    MatIconModule,
    HomeComponent,
    AboutMeComponent,
    MatSidenav,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public themeService: ThemeService, private router: Router) {}

  ngAfterViewInit() {
    this.sidenav.openedStart.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  toggleTheme(): void {
    this.themeService.updateTheme();
  }

  routeToHome(contentSection: HTMLElement): void {
    this.router.navigate(['home']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }

  routeToAboutMe(contentSection: HTMLElement): void {
    this.router.navigate(['aboutme']);
    contentSection.scrollIntoView({ behavior: 'smooth' });
  }
}
