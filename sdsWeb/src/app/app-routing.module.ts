import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardServiceComponent } from './board-service/board-service.component';
import { EditServicingComponent } from './board-service/edit-servicing/edit-servicing.component';
import {DeleteServicingComponent} from './board-service/delete-servicing/delete-servicing.component';
import {CreateServicingComponent} from './board-service/create-servicing/create-servicing.component';
import {ListSolicitationComponent} from './board-solicitation/list-solicitation/list-solicitation.component';
import {ListUsersComponent} from './board-user/list-users/list-users.component';
import {EditUserComponent} from './board-user/edit-user/edit-user.component';
import {DeleteUserComponent} from './board-user/delete-user/delete-user.component';
import {DeleteSolicitationComponent} from './board-solicitation/delete-solicitation/delete-solicitation.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services/:servicingId/solicitations', component: HomeComponent },

  // { path: 'services/:serviceId/solicitations/:status', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'user/all', component: ListUsersComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'delete-user/:id', component: DeleteUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'services', component: BoardServiceComponent },
  { path: 'create-servicing', component: CreateServicingComponent },
  { path: 'edit-servicing/:id', component: EditServicingComponent },
  { path: 'delete-servicing/:id', component: DeleteServicingComponent },
  { path: 'solicitations', component: ListSolicitationComponent },
  { path: 'delete-solicitations/:id', component: DeleteSolicitationComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
