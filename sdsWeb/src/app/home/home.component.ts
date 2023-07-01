import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';
import { ServicingService } from '../_services/servicing.service';
import { SolicitationService } from '../_services/solicitation.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Servicing } from '../model/servicing.model';
import { Solicitation } from '../model/solicitation.model';
import {PageEvent} from "@angular/material/paginator";

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
  solicitation: Solicitation;
  solicitationStatus: Solicitation;

  services: Servicing[] = [];
  displayedColumns: string[] = ['images', 'id', 'name', 'description', 'price', 'solicitation'];

  totalElements = 0;
  pageNumber = 0;
  size = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100];
  imageData: string;

  constructor(
    private userService: UserService,
    private servicingService: ServicingService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitationService: SolicitationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.listAll();
    this.findPageable(this.pageNumber, this.size);
  }

  listAll(): void {
    this.servicingService.listAll().subscribe(
      services => {
        this.services = services;
        this.populateFormWithFirstRowData();
      },
      error => console.log(error)
    );

    this.solicitationForm = this.formBuilder.group({
      id: [null, Validators.required],
      date: [null, Validators.required],
      hour: [null, Validators.required],
      status: [null, Validators.required],
      userId: [null, Validators.required],
    });
  }

  populateFormWithFirstRowData(): void {
    if (this.services.length > 0) {
      const firstRow = this.services[0];
      const statusValue = firstRow.solicitationStatus?.status;

      this.setDefaultStatus(statusValue);

      this.solicitationForm.patchValue({
        id: firstRow.id,
        date: new Date().toISOString().split('T')[0],
        hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        userId: this.tokenStorageService.getUser().id
      });

      const userId = this.tokenStorageService.getUser().id;
      const hasSolicitation = this.services.some(service => service.solicitationStatus?.userId === userId);

      if (!hasSolicitation) {
        this.solicitationForm.get('status')?.setValue('SOLICITED');
        this.solicitationForm.get('status')?.disable();
      } else {
        this.solicitationForm.get('status')?.setValue(false);
        this.solicitationForm.get('status')?.enable();
      }
    }
  }

  isServiceSolicited(row: any): boolean {
    return row.solicitationStatus?.status === 'SOLICITED';
  }

  setDefaultStatus(statusValue: any): void {
    const statusControl = this.solicitationForm.get('status');
    const statusDefaultValue = statusValue !== undefined ? statusValue : false;

    statusControl?.setValue(statusDefaultValue);
    statusControl?.setValidators(Validators.required);
    statusControl?.updateValueAndValidity();
  }

  findPageable(page = 0, size = 10): void {
    this.servicingService.findPageable(page, size).subscribe((response) => {
      console.log(response.content);
      this.services = response.content;
      this.totalElements = response.totalElements;
      this.pageNumber = response.number;
    });
  }


  onSubmit(row: any): void {
    if (this.solicitationForm.invalid) {
      return;
    }

    const userId = this.tokenStorageService.getUser().id;
    const serviceId = row.id;

    this.solicitationService.createSolicitation(userId, serviceId).subscribe(
      (response) => {
        console.log(response);
        this.solicitationService.openSnackBar('Solicitação enviada com sucesso!', 'Fechar');
        row.solicitationStatus = { status: 'SOLICITED' };
        this.solicitationForm.reset();
      },
      (error) => {
        console.log(error);
        if (error === 'Já existe uma solicitação para este serviço.') {
          this.solicitationService.openSnackBar('Já existe uma solicitação para este serviço.', 'Fechar');
        }
        else {
          this.solicitationService.openSnackBar('Você já fez está solicitação.', 'Fechar');
        }
      }
    );
  }


  paging(event: PageEvent): void{
    this.pageNumber = event.pageIndex;
    this.findPageable(this.pageNumber, this.size);
  }

  getImageData(imageUrl: string): void {
    // Implement your logic here to retrieve the image data
    // based on the imageUrl and assign it to imageData variable
    this.imageData = 'Your image data here';
  }
}
