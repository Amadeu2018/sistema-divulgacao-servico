import {Component, Inject, OnInit} from '@angular/core';
import {Servicing} from '../../model/servicing.model';
import {ServicingService} from '../../_services/servicing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { format } from 'date-fns';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-servicing',
  templateUrl: './create-servicing.component.html',
  styleUrls: ['./create-servicing.component.css']
})
export class CreateServicingComponent implements OnInit {

  servicing: Servicing = {
    name: '',
    description: '',
    price: 0,
    images: ''
  };

  constructor(private service: ServicingService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<CreateServicingComponent>,
              @Inject(MAT_DIALOG_DATA) public services: Servicing) {
  }

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.service.findById(id).subscribe(servicing => {
    //   if (servicing) {
    //     this.servicing = servicing;
    //     console.log(servicing);
    //   }
    // });
  }

  close(): void {
    this.dialogRef.close();
  }
}
