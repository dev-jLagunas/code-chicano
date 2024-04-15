import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-latest-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './latest-dialog.component.html',
  styleUrl: './latest-dialog.component.scss',
})
export class LatestDialogComponent {}
