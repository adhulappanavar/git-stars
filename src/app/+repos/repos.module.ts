import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ReposComponent
    }])
  ],
  declarations: [ReposComponent],
  entryComponents: [ReposComponent],
  exports: [ReposComponent]
})
export class ReposModule { }
