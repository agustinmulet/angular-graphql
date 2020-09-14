import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const wait = (cb) => (setTimeout(cb, 3000));

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  success = false;
  constructor(private http: HttpClient) { }

  submitForm(form: any) {
    this.http.post<any>(
      'http://localhost:3000/users/',
      {
        ...form.value,
        posts: []
      }
    )
    .subscribe(data => {
      this.success = true;
      console.log(data);
      form.resetForm();
      wait(() => this.success = false);
    });
  }

  ngOnInit(): void {
  }

}
