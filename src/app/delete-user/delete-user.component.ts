import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  users: any[];
  error: any;
  loading = true;
  GET_USERS = gql`
    {
      users {
        id
        name
      }
    }
  `
  constructor(private apollo: Apollo) { }

  deleteUser(user: any): void {
    const { id } = user;
    this.apollo.mutate({
      mutation: gql`
        mutation deleteUser ($id: String!) {
          deleteUser(id: $id)
        }
      `,
      variables: {
        id
      },
      update: (cache, { data }: any) => {
        // Fetch the users from the cache
        const existingUsers: any = cache.readQuery({
          query: this.GET_USERS
        });
        // Generate an array without the deleted user and update cache
        const newUsers = existingUsers.users.filter((aUser: any) => aUser.id !== data.deleteUser);
        cache.writeQuery({
          query: this.GET_USERS,
          data: {users: [...newUsers]}
        });
      }
    })
    .subscribe(({ data }) => {
      console.log(data);
    }, (error) => {
      console.log('there was an error with the query', error);
    });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: this.GET_USERS
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result.data?.users;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
