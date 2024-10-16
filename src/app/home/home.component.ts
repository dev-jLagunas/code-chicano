import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeaturedDialogComponent } from './featured-dialog/featured-dialog.component';
import { LatestDialogComponent } from './latest-dialog/latest-dialog.component';
import { RandomDialogComponent } from './random-dialog/random-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FeaturedDialogComponent,
    LatestDialogComponent,
    RandomDialogComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public FeaturedDialogComponent = FeaturedDialogComponent;
  public LatestDialogComponent = LatestDialogComponent;
  public RandomDialogComponent = RandomDialogComponent;

  constructor(public dialog: MatDialog) {}

  openDialog(dialogComponent: any): void {
    this.dialog.open(dialogComponent, { autoFocus: false });
  }
}
