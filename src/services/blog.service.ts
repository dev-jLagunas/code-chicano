import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsSource = new BehaviorSubject<any[]>(
    this.loadFromLocalStorage()
  );
  blogPosts = this.blogPostsSource.asObservable();
  private postID: number = 0;

  constructor() {
    const posts = this.loadFromLocalStorage();
    if (posts.length > 0) {
      this.postID = Math.max(...posts.map((post: any) => post.id));
    }
  }

  addBlogPost(newPost: any) {
    const currentPosts = this.blogPostsSource.getValue();
    newPost.id = ++this.postID;
    this.blogPostsSource.next([...currentPosts, newPost]);
    this.saveToLocalStorage();
  }

  deleteBlogPost(postId: number) {
    const currentPosts = this.blogPostsSource.getValue();
    const updatedPosts = currentPosts.filter((post) => post.id !== postId);
    this.blogPostsSource.next(updatedPosts);
    this.saveToLocalStorage();
  }

  updateBlogPost(updatedPost: any) {
    const currentPosts = this.blogPostsSource.getValue();
    const postIndex = currentPosts.findIndex(
      (post) => post.id === updatedPost.id
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

  private loadFromLocalStorage() {
    const posts = localStorage.getItem('blogPosts');
    return posts ? JSON.parse(posts) : [];
  }

  getBlogPostById(postId: number): any {
    const currentPosts = this.blogPostsSource.getValue();
    return currentPosts.find((post) => post.id === postId);
  }
}
