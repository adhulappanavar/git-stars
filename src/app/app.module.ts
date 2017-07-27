import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import {client} from './client'
import { ApolloClient } from 'apollo-client';
import { RepoListComponent } from './repo-list/repo-list.component';

import {MdCardModule, MdIconModule,MdToolbarModule} from '@angular/material';

export function provideClient(): ApolloClient {
  return client;
}


@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule, 
    MdIconModule,
    MdToolbarModule,
     ApolloModule.forRoot(provideClient)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
