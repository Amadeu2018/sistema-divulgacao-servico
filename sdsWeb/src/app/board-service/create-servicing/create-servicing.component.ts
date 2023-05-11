import { Component, OnInit } from '@angular/core';
import {Servicing} from '../../model/servicing.model';
import {ServicingService} from '../../_services/servicing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-create-servicing',
  templateUrl: './create-servicing.component.html',
  styleUrls: ['./create-servicing.component.css']
})
export class CreateServicingComponent implements OnInit {

  // service: Servicing = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   price: '',
  //   solicitation: '',
  //   dateRegistration: ''
  // };

  // servicing: Servicing = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   price: 0,
  //   images: '',
  //   solicitations: '',
  // };

  servicing: Servicing = {
    name: '',
    description: '',
    price: 0,
    images: ''
  };

  constructor(private service: ServicingService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // createService(): void {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   // Formata a data antes de enviar
  //   const formattedDate = format(this.service.dateRegistration, "yyyy-MM-dd'T'HH:mm:ssxxx");
  //   this.service.dateRegistration = formattedDate;
  //
  //   this.servicingService.create(this.service, httpOptions).subscribe((response) => {
  //     this.router.navigate(['/services']);
  //     console.log(response);
  //   });
  // }

  // createService(): void {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     })
  //   };
  //   this.servicingService.create(this.service, httpOptions).subscribe((response) => {
  //     this.router.navigate(['/services']);
  //     console.log(response);
  //   });
  // }



  createService(): void {
    // this.servicingService.create(this.service).subscribe((response) => {
    //   this.router.navigate(['/services']);
    //   console.log(response);
    // });
    this.service.save(this.servicing)
      .subscribe(createdServicing => {
        console.log('Servicing created', createdServicing);
        // reset the form and/or navigate to the list of Servicings
        this.router.navigate(['/services']);
        console.log(createdServicing);
      });
  }

  cancel(): void {
    this.router.navigate(['/services']);
  }
}
