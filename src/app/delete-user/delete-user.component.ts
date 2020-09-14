import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const wait = (cb) => (setTimeout(cb, 2000));

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  users: any[];
  error: any;
  loading = true;
  constructor(private http: HttpClient) { }

  deleteUser(user: any) {
    this.loading = true;
    const { id } = user;
    this.http.delete<any>(`http://localhost:3000/users/${user.id}`).subscribe(data => {
      wait(() => {
        this.users = this.users.filter(myUser => myUser.id !== id);
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users/').subscribe(data => {
      wait(() => {
        this.users = data;
        this.loading = false;
      });
    });
  }
}
