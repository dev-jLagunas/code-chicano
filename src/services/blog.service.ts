import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  catchError,
  throwError,
  tap,
  of,
} from 'rxjs';
import { BlogPost } from '../interface/blog-post';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface FirebaseResponse {
  [key: string]: BlogPost;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsSource = new BehaviorSubject<BlogPost[]>([]);
  blogPosts$: Observable<BlogPost[]> = this.blogPostsSource.asObservable();

  private FIREBASE_URL: string =
    'https://code-chicano-default-rtdb.firebaseio.com/blogPosts';

  constructor(private http: HttpClient) {
    this.loadFromFirebase();
  }

  loadFromFirebase() {
    this.http
      .get<FirebaseResponse>(`${this.FIREBASE_URL}.json`)
      .pipe(takeUntilDestroyed())
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

  addBlogPost(newPost: BlogPost): Observable<BlogPost> {
    return this.http
      .post<{ name: string }>(`${this.FIREBASE_URL}.json`, newPost)
      .pipe(
        map((response) => {
          const updatedPost = { ...newPost, id: response.name };
          const currentPosts = this.blogPostsSource.getValue();
          this.blogPostsSource.next([...currentPosts, updatedPost]);
          return updatedPost;
        }),
        catchError((e) => {
          console.error('Error adding blog post to Firebase:', e);
          return throwError(() => e);
        })
      );
  }

  deleteBlogPost(postId: string): Observable<void> {
    const url = `${this.FIREBASE_URL}/${postId}.json`;
    return this.http.delete(url).pipe(
      tap(() => {
        const updatedPosts = this.blogPostsSource
          .getValue()
          .filter((post) => post.id !== postId);
        this.blogPostsSource.next(updatedPosts);
      }),
      catchError((e) => {
        console.error('Error deleting blog post from Firebase:', e);
        return throwError(() => e);
      }),
      map(() => undefined)
    );
  }

  updateBlogPost(updatedPost: BlogPost): Observable<void> {
    const url = `${this.FIREBASE_URL}/${updatedPost.id}.json`;

    return this.http.put<BlogPost>(url, updatedPost).pipe(
      tap(() => {
        const currentPosts = this.blogPostsSource.getValue();
        const postIndex = currentPosts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (postIndex !== -1) {
          currentPosts[postIndex] = updatedPost;
          this.blogPostsSource.next([...currentPosts]);
        }
      }),
      catchError((e) => {
        console.error('Error updating blog post in Firebase:', e);
        return throwError(() => e);
      }),
      map(() => undefined)
    );
  }

  getBlogPostById(postId: string): Observable<BlogPost | undefined> {
    return this.http.get<BlogPost>(`${this.FIREBASE_URL}/${postId}.json`).pipe(
      map((post) => {
        if (!post) return undefined;
        return { ...post, id: postId };
      }),
      catchError((e) => {
        console.error('Error getting blog post by ID:', e);
        return of(undefined);
      })
    );
  }

  getRandomBlogPost(): Observable<BlogPost | null> {
    return this.blogPosts$.pipe(
      map((posts) => {
        if (!posts.length) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
      }),
      catchError((e) => {
        console.error('Error getting random blog post:', e);
        return of(null);
      })
    );
  }

  getNewestEntry(): Observable<BlogPost | null> {
    return this.blogPosts$.pipe(
      map((posts) => {
        if (!posts.length) return null;
        posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return posts[0];
      }),
      catchError((e) => {
        console.error('Error getting newest entry:', e);
        return of(null);
      })
    );
  }
}
