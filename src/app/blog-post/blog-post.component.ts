import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  post: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const postId = +idParam;
        this.post = this.blogService.getBlogPostById(postId);
      } else {
        console.log('Error');
      }
    });
  }
}
