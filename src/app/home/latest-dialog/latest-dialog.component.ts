import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogService } from '../../../services/blog.service';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-latest-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatCardModule, DatePipe],
  templateUrl: './latest-dialog.component.html',
  styleUrl: './latest-dialog.component.scss',
})
export class LatestDialogComponent implements OnInit {
  latestPost!: any;

  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.latestPost = this.blogService.getNewestEntry();
  }
}
