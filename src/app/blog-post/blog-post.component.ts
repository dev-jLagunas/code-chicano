import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  post$!: Observable<any>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id !== null) {
          return this.blogService.getBlogPostById(id);
        } else {
          throw new Error('Blog post ID not found in route parameters.');
        }
      })
    );
  }
}
