import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe, MatMenuModule],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss',
})
export class BlogHomeComponent {
  blogPosts!: any[];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogService.blogPosts.subscribe((posts) => {
      this.blogPosts = posts;
    });
  }

  goToBlogDetail(postId: number) {
    this.router.navigate(['/blog', postId]);
  }
}
