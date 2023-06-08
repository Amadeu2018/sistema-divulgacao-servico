import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Page} from '../../model/page.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {User} from '../../model/user.model';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {DeleteUserComponent} from '../delete-user/delete-user.component';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  page: Page<User>;

  displayedColumns: string[] = ['id', 'displayName', 'email', 'phone', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listAll();
  }


  listAll(): void {
    const page = 0; // valor padrão para a página
    const size = 10; // valor padrão para o tamanho da página
    this.userService.listAll(page, size).subscribe({
      next: (pageNumber: Page<User>) => {
        console.log(pageNumber.content);
        this.page = pageNumber;
        this.dataSource.data = pageNumber.content;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => console.log(error)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getRoleName(roles: any[]): string {
    if (!roles) {
      return 'N/A'; // ou qualquer valor que você queira retornar quando o array 'roles' for undefined
    }

    if (roles.some(role => role.name === 'ROLE_ADMIN')) {
      return 'Administrador';
    } else if (roles.some(role => role.name === 'ROLE_MODERATOR')) {
      return 'Supervisor';
    } else {
      return 'Usuário';
    }
  }


  // getRoleName(roles: any[]): string {
  //   if (roles.some(role => role.name === 'ROLE_ADMIN')) {
  //     return 'Administrador';
  //   } else if (roles.some(role => role.name === 'ROLE_MODERATOR')) {
  //     return 'Supervisor';
  //   } else {
  //     return 'Usuário';
  //   }
  // }

  update(id: any): void {
    this.userService.findById(id).subscribe(
      (response) => {
        console.log('response:', response);
        if (response) {
          this.dialog.open(EditUserComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
              user: response, // Altere 'users' para 'user'
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  delete(id: any): void{
    this.userService.findById(id).subscribe(
      (response) => {
        console.log('response:', response);
        if (response) {
          this.dialog.open(DeleteUserComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
              user: response, // Altere 'users' para 'user'
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
