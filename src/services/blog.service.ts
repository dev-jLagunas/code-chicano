import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogPost } from '../interface/blog-post';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsSource = new BehaviorSubject<BlogPost[]>(
    this.loadFromLocalStorage()
  );
  blogPosts = this.blogPostsSource.asObservable();
  private postID: number = 0;

  constructor() {
    const posts = this.loadFromLocalStorage();
    if (posts.length > 0) {
      this.postID = Math.max(...posts.map((post: BlogPost) => post.id));
    }
  }

  addBlogPost(newPost: BlogPost) {
    const currentPosts = this.blogPostsSource.getValue();
    newPost.id = ++this.postID;
    this.blogPostsSource.next([...currentPosts, newPost]);
    this.saveToLocalStorage();
  }

  deleteBlogPost(postId: number) {
    const currentPosts = this.blogPostsSource.getValue();
    const updatedPosts = currentPosts.filter(
      (post: BlogPost) => post.id !== postId
    );
    this.blogPostsSource.next(updatedPosts);
    this.saveToLocalStorage();
  }

  updateBlogPost(updatedPost: BlogPost) {
    const currentPosts = this.blogPostsSource.getValue();
    const postIndex = currentPosts.findIndex(
      (post: BlogPost) => post.id === updatedPost.id
    );
    if (postIndex !== -1) {
      currentPosts[postIndex] = updatedPost;
      this.blogPostsSource.next([...currentPosts]);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      'blogPosts',
      JSON.stringify(this.blogPostsSource.getValue())
    );
  }

  private loadFromLocalStorage(): BlogPost[] {
    const posts = localStorage.getItem('blogPosts');
    return posts ? JSON.parse(posts) : [];
  }

  getBlogPostById(postId: number): BlogPost | undefined {
    const currentPosts = this.blogPostsSource.getValue();
    return currentPosts.find((post) => post.id === postId);
  }

  getRandomBlogPost(): BlogPost | null {
    const currentPosts = this.blogPostsSource.getValue();
    if (currentPosts.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * currentPosts.length);
    return currentPosts[randomIndex];
  }

  getNewestEntry(): BlogPost | null {
    const currentPosts = this.blogPostsSource.getValue();
    if (currentPosts.length === 0) {
      return null;
    }
    currentPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return currentPosts[0];
  }
}
