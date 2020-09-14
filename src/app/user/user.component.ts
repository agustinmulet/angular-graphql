import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

const wait = (cb) => (setTimeout(cb, 2000));

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  error: any;
  loading = true;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.http.get<any>(`http://localhost:3000/users/${params.get('id')}`).subscribe(data => {
        wait(() => {
          this.user = data;
          this.loading = false;
        });
      });
    });
  }

}
