import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-featured-dialog',
  standalone: true,
  imports: [],
  templateUrl: './featured-dialog.component.html',
  styleUrl: './featured-dialog.component.scss',
})
export class FeaturedDialogComponent implements OnInit {
  blogPosts!: any[];
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.blogPosts.subscribe((posts) => {
      this.blogPosts = posts;
    });
  }
}
