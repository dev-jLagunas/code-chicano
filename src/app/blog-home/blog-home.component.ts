import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';
import { BlogPost } from '../../interface/blog-post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe, MatMenuModule, AsyncPipe],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss',
})
export class BlogHomeComponent {
  blogPosts$: Observable<BlogPost[]> = this.blogService.blogPosts$;

  constructor(
    private blogService: BlogService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  routeToBlogDetail(postId: string) {
    this.router.navigate(['/blog', postId]);
  }
}
