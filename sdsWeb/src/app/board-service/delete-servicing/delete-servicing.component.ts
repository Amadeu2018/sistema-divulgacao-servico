import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ServicingService} from '../../_services/servicing.service';
import {Servicing} from '../../model/servicing.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-servicing',
  templateUrl: './delete-servicing.component.html',
  styleUrls: ['./delete-servicing.component.css']
})
export class DeleteServicingComponent implements OnInit {

  servicing: Servicing = {
    id: '',
    photo: '',
    name: '',
    description: '',
    price: '',
    // images: '',
    // solicitations: '',
  };

  constructor(private service: ServicingService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DeleteServicingComponent>,
              @Inject(MAT_DIALOG_DATA) public services: Servicing) { }

  ngOnInit(): void {
    this.servicing = {
      id: this.services.id,
      photo: this.services.photo,
      name: this.services.name,
      description: this.services.description,
      price: this.services.price,
    };
  }

  delete(): void{
    this.service.delete(this.servicing.id, this.servicing).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Service deleted successfully', '', {duration: 3000});
        this.router.navigate(['/services']);
      },
      (error) => {
        this.snackBar.open('Error delete service', '', {duration: 3000});
        console.log(error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  public get imageData(): string {
    return 'data:image/jpg;base64,' + this.services.photo;
  }

  // convertImg(): void{
  //   imageData: string;
  //
  //   const byteString = atob(this.servicing.photo.split(',')[1]);
  //   const mimeString = this.servicing.photo.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([ab], { type: mimeString });
  //   this.imageData = URL.createObjectURL(blob);
  //
  // }

}
