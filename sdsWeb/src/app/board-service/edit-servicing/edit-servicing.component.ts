import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {ServicingService} from '../../_services/servicing.service';
import {Servicing} from '../../model/servicing.model';

@Component({
  selector: 'app-edit-servicing',
  templateUrl: './edit-servicing.component.html',
  styleUrls: ['./edit-servicing.component.css']
})
export class EditServicingComponent implements OnInit {

  // servicing: Servicing = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   price: '',
  //   // images: '',
  //   // solicitations: '',
  // };
  servicing: Servicing;

  // tslint:disable-next-line:max-line-length
  constructor(private service: ServicingService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<EditServicingComponent>,
              @Inject(MAT_DIALOG_DATA) public services: Servicing) {
  }

  ngOnInit(): void {
    this.servicing = {
      id: this.services.id,
      name: this.services.name,
      description: this.services.description,
      price: this.services.price,
    };
  }
  close(): void {
    this.dialogRef.close();
  }

  updateService(): void {
    this.service.update(this.services.id, this.servicing).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/services']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
