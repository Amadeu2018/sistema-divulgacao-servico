import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Servicing} from "../model/servicing.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  services: Servicing[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'images', 'acoes'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
