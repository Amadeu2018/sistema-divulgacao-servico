import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ServicingService} from '../../_services/servicing.service';
import {Servicing} from '../../model/servicing.model';

@Component({
  selector: 'app-delete-servicing',
  templateUrl: './delete-servicing.component.html',
  styleUrls: ['./delete-servicing.component.css']
})
export class DeleteServicingComponent implements OnInit {

  servicing: Servicing = {
    id: '',
    name: '',
    description: '',
    price: '',
    // images: '',
    // solicitations: '',
  };
  constructor(private service: ServicingService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe(servicing => {
      if (servicing) {
        this.servicing = servicing;
        console.log(servicing);
      }
    });
  }

  delete(): void{
    this.service.delete(this.servicing.id, this.servicing).subscribe(
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
