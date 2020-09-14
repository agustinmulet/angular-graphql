import { Component, OnInit } from '@angular/core';

const wait = (cb) => (setTimeout(cb, 2000));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: any[];
  error: any;
  loading = true;

  ngOnInit() {
    this.loading = true;
    wait(() => {
      this.users = ['fakeData'];
      this.loading = false;
    });
  }
}
