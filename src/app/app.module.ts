import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { client } from './client'
import { ApolloClient } from 'apollo-client';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export function provideClient(): ApolloClient {
  return client;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
     ApolloModule.forRoot(provideClient),
     RouterModule.forRoot([{
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
