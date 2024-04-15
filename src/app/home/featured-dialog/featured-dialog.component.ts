import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-featured-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatCardModule, DatePipe],
  templateUrl: './featured-dialog.component.html',
  styleUrl: './featured-dialog.component.scss',
})
export class FeaturedDialogComponent implements OnInit {
  featuredPost!: any;
  constructor(
    private blogService: BlogService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.featuredPost = this.blogService.getRandomBlogPost();
  }
}
