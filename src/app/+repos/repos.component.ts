import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { QueryResponse, Repo } from './repos';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import { DocumentNode } from 'graphql';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import gql from 'graphql-tag';
import sortBy from 'lodash.sortby';

@Component({
  selector: 'gs-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  private repoListQuery: DocumentNode;
  private likeRepoQuery: DocumentNode;
  private showLikesQuery: DocumentNode;
  private queryObservable: ApolloQueryObservable<QueryResponse>;
  private reposListSubscription: Subscription;
  public reposList: Repo[];
  public loading: boolean;
  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.loading = true;
    this.repoListQuery = gql `
{
  allReposes {
    id
    repoName
    logoUrl
    likes
  }
}
`;

    this.likeRepoQuery = gql `
mutation updateLikes ($id:ID!, $likes: Int!) {
  updateRepos (id: $id, likes: $likes) {
    id
    likes
  }
}
`;

    this.showLikesQuery = gql `
subscription {
  Repos {
    mutation
    node {
      likes
      repoName
    }
  }
}
`;

    this.queryObservable = this.apollo.watchQuery <QueryResponse> ({
      query: this.repoListQuery
    });

    this.reposListSubscription = this.queryObservable.subscribe(({
      data,
      loading
    }) => {
      console.log(`Retrieved Data`, data);
      this.reposList = sortBy(data.allReposes, 'likes').reverse();
      this.loading = loading;
    });

    const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj5ld6rzgk6r80122xbcvpvcj', {
      timeout: 10000,
      reconnect: true
    }).subscribe({
      query: `
subscription {
  Repos {
    mutation
    node {
      likes
      repoName
    }
  }
}`,
      variables: null
    }, (err, res) => {
      console.log(`Error retrieving data`, err);
      this.queryObservable.refetch();
    });
  }

  addLike(id: string): void {
    const repoLiked = this.reposList.filter(repo => repo.id === id);
    const repoLikedCount = repoLiked[0] ? repoLiked[0].likes + 1 : 0;
    if (repoLikedCount) {
      console.log(`You clicked repo with id:${id} and updated like count to ${repoLikedCount}`);
      this.loading = true;
      this.apollo.mutate <QueryResponse> ({
        mutation: this.likeRepoQuery,
        variables: {
          id,
          likes: repoLikedCount
        }
      });
    }
  }
}
