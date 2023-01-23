import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {InsertUserComponent} from './insert-user/insert-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ShowUsersComponent} from './show-users/show-users.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "insert",
    component: InsertUserComponent
  },
  {
    path: "edit",
    component: EditUserComponent
  },
  {
    path: "allUsers",
    component: ShowUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
