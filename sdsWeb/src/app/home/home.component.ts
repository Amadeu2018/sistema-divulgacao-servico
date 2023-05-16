import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Servicing} from '../model/servicing.model';
import {ServicingService} from '../_services/servicing.service';
import {SolicitationService} from '../_services/solicitation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Solicitation} from '../model/solicitation.model';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FormBuilder]
})
export class HomeComponent implements OnInit {

  content: string;
  servicing: Servicing;
  solicitationForm: FormGroup;

  services: Servicing[] = [];
  // displayedColumns: string[] = ['id', 'name', 'description', 'price', 'images'];
  displayedColumns: string[] = ['images', 'id', 'name', 'description', 'price', 'solicitation'];

  /*Bootstrap Template*/
  service: Servicing[] = [];
  dataSource = ['images', 'name', 'description', 'price', 'solicitation'];
  totalElementos = 0;
  pageNumber = 0;
  size = 10;
  pageSizeOptions: number[] = [5, 10, 15, 100];
  imageData: string;

  constructor(private userService: UserService, private servicingService: ServicingService, private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private solicitationService: SolicitationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.lisAll();

    this.findPageable(this.pageNumber, this.size);
  }
  lisAll(): void {
    this.servicingService.listAll()
      .subscribe(
        services => this.services = services,
        error => console.log(error)
      );

    this.route.data.subscribe((data: { servicing: Servicing }) => {
      this.servicing = data.servicing;
    });

    this.solicitationForm = this.formBuilder.group({
      date: [null, Validators.required],
      hour: [null, Validators.required],
      comment: ''
    });
  }


  onSubmit(): void {
    const solicitation = this.solicitationForm.value as Solicitation;
    this.solicitationService.createSolicitation(this.servicing.id, solicitation).subscribe(
      (newSolicitation) => {
        console.log('New solicitation created:', newSolicitation);
        this.router.navigate(['/solicitations', newSolicitation.id]);
      },
      (error) => {
        console.error('Error creating solicitation:', error);
      }
    );
  }

  findPageable(page = 0, size = 10): void {
    this.servicingService.findPageable(page, size).subscribe((response) => {
      console.log(response.content);
      this.service = response.content;
      this.totalElementos = response.totalElements;
      this.pageNumber = response.number;
    });
  }

  paging(event: PageEvent): void{
    this.pageNumber = event.pageIndex;
    this.findPageable(this.pageNumber, this.size);
  }

  soliciting(soliciation: Solicitation): void {
    this.solicitationService.soliciting(soliciation).subscribe((response) => {
      soliciation.service = !soliciation.service;
    });
  }

  uploadFoto(event, servicing): void{
    const files = event.target.files;
    if (files) {
      const image = files[0];
      const formData: FormData = new FormData();
      formData.append('image', image);

      this.servicingService
        .upload(servicing, formData)
        .subscribe((response) => this.findPageable());
    }
  }

  createSolicitation(solicitation: Solicitation): Observable<Solicitation> {
    const servicingId = this.route.snapshot.paramMap.get('servicingId');
    return this.solicitationService.createSolicitation(Number(servicingId), solicitation);
    console.log(solicitation);
  }

}
