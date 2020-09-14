import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const wait = (cb) => (setTimeout(cb, 2000));

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  error: any;
  loading = true;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users').subscribe(data => {
      wait(() => {
        this.users = data;
        this.loading = false;
      });
    });
  }

}
