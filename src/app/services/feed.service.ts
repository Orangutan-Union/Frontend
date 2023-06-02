import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/addLike';
import { NewComment } from '../models/newComment';
import { NewPost } from '../models/newPost';
import { Post } from '../models/post';

const httpOptions={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private route: Router) { }

  getFullPost(id: number): Observable<Post>{
    return this.http.get<Post>(this.baseApiUrl + 'Post/' + id)
  }

  getUserPosts(id: number): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseApiUrl + 'Post/user/' + id);
  }

  getUserFeed(id: number): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseApiUrl + 'Post/feed/' + id);
  }

  getUsersFollowerFeed(id: number): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseApiUrl + 'Post/followerfeed/' + id);
  }

  getUsersFriendFeed(id: number): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseApiUrl + 'Post/friendfeed/' + id);
  }

  addPost(newPost: NewPost): Observable<NewPost>{
    return this.http.post<NewPost>(this.baseApiUrl + 'Post', newPost, httpOptions)
  }

  updatePost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.baseApiUrl + 'Post/update', post)
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(this.baseApiUrl + 'Post/' + id, httpOptions)
  }

  addLike(like: Like): Observable<Like> {
    return this.http.post<Like>(this.baseApiUrl + 'Like', like, httpOptions)
  }

  addComment(newComment: NewComment): Observable<NewComment>{
    return this.http.post<NewComment>(this.baseApiUrl + 'Comment', newComment, httpOptions)
  }

  updateComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.baseApiUrl + 'Comment', comment, httpOptions)
  }

  deletComment(id: number): Observable<Comment> {
    return this.http.post<Comment>(this.baseApiUrl + 'Comment/' + id, httpOptions)
  }

}
