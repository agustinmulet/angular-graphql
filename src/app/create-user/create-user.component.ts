import { Component } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  success = false;
  constructor(private apollo: Apollo) { }

  submitForm(form: any): void {
    this.apollo.mutate({
      mutation: gql`
        mutation addUser ($name: String!, $address: String!, $birthday: String!) {
          addUser(name: $name, address: $address, birthday: $birthday)
          {
            id
            name
            address
            birthday
            posts {
              id
              title
            }
          }
        }
      `,
      variables: {
        ...form.value
      },
      update: (cache, {data}: any) => {
        //Modify cache directly with a graphql fragment
        cache.modify({
          fields: {
            users(existingUsers = []): any[] {
              const newUser = cache.writeFragment({
                data: data.addUser,
                fragment: gql`
                  fragment NewUser on users {
                    id
                    name
                    address
                    birthday
                    posts {
                      id
                      title
                      content
                      comments
                    }
                  }
                `
              });
              return [...existingUsers, newUser];
            }
          }
        });
      }
    })
    .subscribe(({ data }) => {
      this.success = true;
      console.log(data);
      form.resetForm();
      setTimeout(() => this.success = false, 3000);
    }, (error) => {
      console.log('there was an error with the query', error);
    });
  }
}
