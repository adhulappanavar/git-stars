import { Component, OnInit } from '@angular/core';
import { Apollo} from 'apollo-angular';
import {Subscription} from 'rxjs/Subscription';
import gql from 'graphql-tag';
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

@Component({
  selector: 'gs-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
repos:any;
repoLike:number;

  constructor(private apollo:Apollo) { }

  ngOnInit() {

  this.apollo.watchQuery<QueryResponse>({ query: repoList })
        .subscribe(({data}) => {
          console.log(data) 
          this.repos= data.allReposes}
       );

  }

 public addLike(id:string){

  this.repoLike=this.repos.filter(repo => repo.id === id);
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

interface QueryResponse{
  allReposes:{
    repos:Repo[]
  }
}
interface Repo{
  id:string,
  repoName:string,
  LogoUrl:string,
  likes:number
}