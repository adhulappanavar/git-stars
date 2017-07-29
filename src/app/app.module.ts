import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { client } from './client'
import { ApolloClient } from 'apollo-client';
import { RepoListComponent } from './repo-list/repo-list.component';

import { MdCardModule, MdIconModule, MdToolbarModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export function provideClient(): ApolloClient {
  return client;
}


@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule,
    MdIconModule,
    MdToolbarModule,
     ApolloModule.forRoot(provideClient),
     RouterModule.forRoot([{
       path: 'repo-list',
       component : RepoListComponent
     }, {
       path: '',
       loadChildren: './+repos/repos.module#ReposModule'
     }, {
       path: '**',
       redirectTo: '',
       pathMatch: 'full'
     }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
