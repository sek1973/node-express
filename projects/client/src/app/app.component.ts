import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  users: any[] = [];
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.subscription.unsubscribe();
    this.subscription = this.httpClient.get<any>('/api/users')
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(event: Event): void {
    this.subscription.unsubscribe();
    this.subscription = this.httpClient.post<any[]>('/api/add',
      {
        name: `new ${new Date().toLocaleTimeString()}`,
        password: "new password",
        profession: "unknown",
        id: 0
      })
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });
  }

}
