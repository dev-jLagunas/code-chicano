import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public themeService: ThemeService, private router: Router) {}

  toggleTheme() {
    this.themeService.updateTheme();
  }

  routeToHome(): void {
    this.router.navigate(['home']);
  }

  routeToAbout(): void {
    this.router.navigate(['aboutme']);
  }

  routeToContact(): void {
    this.router.navigate(['contact']);
  }
}
