import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  error: any;
  loading = true;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              id
              name
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result.data?.users;
        this.loading = result.loading;
        this.error = result.error;
      })
  }

}
