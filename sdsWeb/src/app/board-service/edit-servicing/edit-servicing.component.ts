import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ServicingService} from '../../_services/servicing.service';
import {Servicing} from '../../model/servicing.model';

@Component({
  selector: 'app-edit-servicing',
  templateUrl: './edit-servicing.component.html',
  styleUrls: ['./edit-servicing.component.css']
})
export class EditServicingComponent implements OnInit {

  servicing: Servicing = {
    id: '',
    name: '',
    description: '',
    price: '',
    // images: '',
    // solicitations: '',
  };

  // tslint:disable-next-line:max-line-length
  constructor(private service: ServicingService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  // constructor(, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe(servicing => {
      if (servicing) {
        this.servicing = servicing;
        console.log(servicing);
      }
    });
  }

  updateService(): void {
    this.service.update(this.servicing.id, this.servicing).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/services']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/services']);
  }

}
