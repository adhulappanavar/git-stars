import { Component, OnInit } from '@angular/core';
import { Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';
import gql from 'graphql-tag';
import {SubscriptionClient,addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import{DocumentNode} from 'graphql'

const repoList:DocumentNode=gql`
{
  allReposes {
    id
    repoName
    logoUrl
    likes
  }

}
`
const likeRepo:DocumentNode=gql`
mutation updateLikes ($id:ID!, $likes: Int!) {
  updateRepos (id: $id, likes: $likes) {
    id
    likes
  }
}
`

const showLikes:DocumentNode=gql`
subscription {
  Repos {
    mutation
    node {
      likes
      repoName
    }
  }
}
`

@Component({
  selector: 'gs-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
 loading: boolean = true;
  reposList:any;
allReposes:any;
allReposesCopy:any;
reposListSub:Subscription;
repoLike:number;


  constructor(private apollo:Apollo) { }

  ngOnInit() {

  const queryObservable = this.apollo.watchQuery<QueryResponse>({
      query: repoList
    })
       this.reposListSub=queryObservable.subscribe(({data,loading}) => {
        
        console.log(data) 
        this.allReposesCopy = JSON.parse(JSON.stringify(data));
        this.allReposesCopy.allReposes.sort((a: any, b: any) => {
        return b.likes - a.likes;
        });
        this.reposList = this.allReposesCopy.allReposes;
        this.loading = loading;
        
        }
       );

          const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj5ld6rzgk6r80122xbcvpvcj', {
      timeout: 10000,
      reconnect: true
    })


wsClient.subscribe({
      query:`
subscription {
  Repos {
    mutation
    node {
      likes
      repoName
    }
  }
}
      `,
      variables: null
    }, (err, res) => {
      console.log('--')
      console.log(err)
      queryObservable.refetch()
    })

  }

 public addLike(id:string){
  this.repoLike=this.reposList.filter(repo => repo.id === id);
this.repoLike=this.repoLike[0].likes+1;

   console.log('you clicked'+id,this.repoLike)

     this.apollo.mutate<QueryResponse>({ 
       mutation:likeRepo,
       variables:{id,likes:this.repoLike} 
      
      })
      .subscribe()
      //   .subscribe(({data}) => {
      //     console.log(data) 
      //     this.repos= data.allReposes}
      //  );

 } 

}

export interface QueryResponse{
  allReposes:{
    repos:any
  }

}
export interface Repo{
  id:string,
  repoName:string,
  LogoUrl:string,
  likes:number
}