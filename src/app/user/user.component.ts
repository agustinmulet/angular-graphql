import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
    private apollo: Apollo
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.apollo
      .watchQuery({
        query: gql`
          query getUser($id: String!){
            user(id: $id) {
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
          id: params.get('id')
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.user = result.data?.user;
        this.loading = result.loading;
        this.error = result.error;
      });
    });
  }

}
