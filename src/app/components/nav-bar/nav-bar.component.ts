import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  search: string = '';
  user: User = new User;
  userId: number = 0;
  formData = new FormData();
  private searchSubscription?: Subscription;
  private readonly searchSubject = new Subject<string | undefined>();
  searchUsers: User[] = [];
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.searchWithDelay();
  }

  getUser(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.authService.getUserById(this.userId).subscribe({
      next: (usr => {
        this.user = usr;
        console.log(this.user);
      })
    });
  }

  logOff(): void {
    this.authService.logout();
  }

  onSearchQueryInput(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    if (searchQuery.trim().length > 2) {
      this.search = searchQuery;
      this.searchSubject.next(searchQuery?.trim());
    }
    else if (searchQuery.trim().length <= 2){
      this.searchUsers = [];
      this.search = '';
    }
  }

  searchWithDelay(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500), // Miliseconds after last input before searching starts
        switchMap(term => this.authService.getUsersBySearch(term!.trim()))
      )
      .subscribe(res => {
        if (this.search !== '') { // If statement prevents results from not matching query which could happen if you used backspace fast
          this.searchUsers = res.slice(0, 4);
          console.log(this.searchUsers);
          console.log('SENDING API REQUEST'); 
        }                
      })
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
