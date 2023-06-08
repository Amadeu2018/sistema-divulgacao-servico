import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  user: User;
  availableRoles: string[] = ['ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER'];
  selectedRole: string;
  roleOptions: { value: string; label: string }[] = [];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) { }

  // ngOnInit(): void {
  //   this.user = { ...this.data.user };
  //   this.selectedRole = this.user.role ? this.user.role[0] : null;
  //   this.roleOptions = this.availableRoles.map(role => {
  //     return { value: role, label: this.getRoleName(role) };
  //   });
  // }

  ngOnInit(): void {
    this.user = { ...this.data.user };
    this.user.role = this.data.user.role ? this.data.user.role.map(roles => roles.name) : [];
    this.selectedRole = this.getRoleName(this.user.role);
  }

  // getRoleName(role: string): string {
  //   if (role === 'ROLE_ADMIN') {
  //     return 'Administrador';
  //   } else if (role === 'ROLE_MODERATOR') {
  //     return 'Supervisor';
  //   } else if (role === 'ROLE_USER') {
  //     return 'Usuário';
  //   } else {
  //     return '';
  //   }
  // }

  getRoleName(role: string[]): string {
    if (role.some(roles => roles === 'ROLE_ADMIN')) {
      return 'Administrador';
    } else if (role.some(roles => roles === 'ROLE_MODERATOR')) {
      return 'Supervisor';
    } else {
      return 'Usuário';
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
