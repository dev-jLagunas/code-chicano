import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, map, Subscription } from 'rxjs';
import { BlogPost } from '../interface/blog-post';
import { HttpClient } from '@angular/common/http';

interface FirebaseResponse {
  [key: string]: BlogPost;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService implements OnDestroy {
  private blogPostsSource = new BehaviorSubject<BlogPost[]>([]);
  blogPosts: Observable<BlogPost[]> = this.blogPostsSource.asObservable();

  private FIREBASE_URL: string =
    'https://code-chicano-default-rtdb.firebaseio.com/blogPosts';

  private subscription!: Subscription;

  constructor(private http: HttpClient) {
    this.loadFromFirebase();
  }

  loadFromFirebase() {
    this.subscription = this.http
      .get<FirebaseResponse>(`${this.FIREBASE_URL}.json`)
      .subscribe({
        next: (response) => {
          const posts = Object.entries(response || {}).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          this.blogPostsSource.next(posts);
        },
        error: (e) => console.error('Error loading posts from Firebase:', e),
      });
  }

  //Change this later because its better to not subscribe inside service. Instead subscribe in the component that uses this.
  // in this case I would need to change the blog admin class
  addBlogPost(newPost: BlogPost) {
    this.http.post<any>(`${this.FIREBASE_URL}.json`, newPost).subscribe({
      next: (response) => {
        newPost.id = response.name;
        const currentPosts = this.blogPostsSource.getValue();
        this.blogPostsSource.next([...currentPosts, newPost]);
      },
      error: (e) => console.error('Error adding blog post to Firebase:', e),
    });
  }

  //Same as above
  deleteBlogPost(postId: string) {
    const url = `${this.FIREBASE_URL}/${postId}.json`;
    this.http.delete(url).subscribe({
      next: () => {
        const updatedPosts = this.blogPostsSource
          .getValue()
          .filter((post) => post.id !== postId);
        this.blogPostsSource.next(updatedPosts);
      },
      error: (e) => console.error('Error deleting blog post from Firebase:', e),
    });
  }

  updateBlogPost(updatedPost: BlogPost) {
    const url = `${this.FIREBASE_URL}/${updatedPost.id}.json`;

    this.http.put<BlogPost>(url, updatedPost).subscribe({
      next: () => {
        const currentPosts = this.blogPostsSource.getValue();
        const postIndex = currentPosts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (postIndex !== -1) {
          currentPosts[postIndex] = updatedPost;
          this.blogPostsSource.next([...currentPosts]);
        }
      },
      error: (e) => console.error('Error updating blog post in Firebase:', e),
    });
  }

  getBlogPostById(postId: string): Observable<BlogPost | undefined> {
    return this.http.get<BlogPost>(`${this.FIREBASE_URL}/${postId}.json`).pipe(
      map((post) => {
        if (!post) return undefined;
        return { ...post, id: postId };
      })
    );
  }

  getRandomBlogPost(): Observable<BlogPost | null> {
    return this.blogPosts.pipe(
      map((posts) => {
        if (posts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
      })
    );
  }

  getNewestEntry(): Observable<BlogPost | null> {
    return this.blogPosts.pipe(
      map((posts) => {
        if (posts.length === 0) return null;
        posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return posts[0];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
