import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BoardServiceComponent } from './board-service/board-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { EditServicingComponent } from './board-service/edit-servicing/edit-servicing.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DeleteServicingComponent } from './board-service/delete-servicing/delete-servicing.component';
import { CreateServicingComponent } from './board-service/create-servicing/create-servicing.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ListSolicitationComponent } from './board-solicitation/list-solicitation/list-solicitation.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ServicingService} from './_services/servicing.service';
import {SolicitationService} from './_services/solicitation.service';
import { ListUsersComponent } from './board-user/list-users/list-users.component';
import { EditUserComponent } from './board-user/edit-user/edit-user.component';
import { DeleteUserComponent } from './board-user/delete-user/delete-user.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { DeleteSolicitationComponent } from './board-solicitation/delete-solicitation/delete-solicitation.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BoardServiceComponent,
    EditServicingComponent,
    DeleteServicingComponent,
    CreateServicingComponent,
    ListSolicitationComponent,
    ListUsersComponent,
    EditUserComponent,
    DeleteUserComponent,
    FieldErrorDisplayComponent,
    DeleteSolicitationComponent,
    // ServicingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  exports: [EditServicingComponent],
  providers: [authInterceptorProviders, MatDatepickerModule, MatNativeDateModule, ServicingService, SolicitationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
