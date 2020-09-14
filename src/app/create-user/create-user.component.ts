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

  submitForm(form: any) {
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
