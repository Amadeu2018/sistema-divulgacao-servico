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
import {SolicitationRequest} from '../model/SolicitationRequest';
import {TokenStorageService} from '../_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  // displayedColumns: string[] = ['id', 'name', 'description', 'price', 'images'];
  displayedColumns: string[] = ['images', 'id', 'name', 'description', 'price', 'solicitation'];

  /*Bootstrap Template*/
  service: Servicing[] = [];
  dataSource: string[] = ['images', 'id', 'name', 'description', 'price', 'solicitation'];
  totalElements = 0;
  pageNumber = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15, 100];
  imageData: string;

  constructor(private userService: UserService, private servicingService: ServicingService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private solicitationService: SolicitationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

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

    this.findPageable(this.pageNumber, this.pageSize);
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
      id: [null, Validators.required],
      date: [null, Validators.required],
      hour: [null, Validators.required],
      status: [null, Validators.required],
      user: [null, Validators.required],
      service: ['', Validators.required] // Alteração: definir valor inicial como vazio
    });

  }

  // onSubmit(row: any): void {
  //   const userId = this.tokenStorageService.getUser().id;
  //   const serviceId = row?.id;
  //
  //   if (serviceId) {
  //     this.solicitationService.createSolicitation(userId, serviceId).subscribe(
  //       (solicitation) => {
  //         console.log('Solicitação criada com sucesso:', solicitation);
  //         console.log(row.solicitation.status);
  //         this.snackBar.open('A sua solicitação foi aceite, entraremos em contato!', '', { duration: 3000 });
  //
  // row.buttonProperties = { color: solicitation.status === 'SOLICITED' ? 'green' : 'red', text: solicitation.status === 'SOLICITED' ? 'Solicitado' : 'Solicitar' };
  //       },
  //       (error) => {
  //         console.error('Erro ao criar solicitação:', error);
  //         console.log('Detalhes do erro:', error.error);
  //       }
  //     );
  //   } else {
  //     console.error('ID de serviço não está definido.');
  //     this.snackBar.open('Você já solicitou este serviço!', '', { duration: 3000 });
  //   }
  // }

  onSubmit(row: any): void {
    const userId = this.tokenStorageService.getUser().id;
    const serviceId = row?.id;

    if (serviceId) {
      this.solicitationService.createSolicitation(userId, serviceId).subscribe(
        (solicitation) => {
          console.log('Solicitação criada com sucesso:', solicitation);
          row.solicitationStatus = new Solicitation({ status: 'SOLICITED' }); // Atualiza o status da solicitação na linha da tabela
          this.snackBar.open('A sua solicitação foi aceite, entraremos em contato!', '', { duration: 3000 });
        },
        (error) => {
          console.error('Erro ao criar solicitação:', error);
          console.log('Detalhes do erro:', error.error);
        }
      );
    } else {
      console.error('ID de serviço não está definido.');
      this.snackBar.open('Você já solicitou este serviço!', '', { duration: 3000 });
    }
  }


  // onSubmit(row: any): void {
  //   const userId = this.tokenStorageService.getUser().id;
  //   const serviceId = row?.id;
  //
  //   if (serviceId) {
  //     this.solicitationService.createSolicitation(userId, serviceId).subscribe(
  //       (solicitation) => {
  //         console.log('Solicitação criada com sucesso:', solicitation);
  //         row.solicitationStatus = new Solicitation({ status: 'SOLICITED' }); // Atualiza o status da solicitação na linha da tabela
  //         this.snackBar.open('A sua solicitação foi aceite, entraremos em contato!', '', { duration: 3000 });
  //       },
  //       (error) => {
  //         console.error('Erro ao criar solicitação:', error);
  //         console.log('Detalhes do erro:', error.error);
  //       }
  //     );
  //   } else {
  //     console.error('ID de serviço não está definido.');
  //     this.snackBar.open('Você já solicitou este serviço!', '', { duration: 3000 });
  //   }
  // }


  // este abaixo

  // onSubmit(row: any): void {
  //   const userId = this.tokenStorageService.getUser().id;
  //   const serviceId = row?.id;
  //
  //   if (serviceId) {
  //     this.solicitationService.createSolicitation(userId, serviceId).subscribe(
  //       (solicitation) => {
  //         console.log('Solicitação criada com sucesso:', solicitation);
  //         row.solicitation = solicitation; // Atualiza o objeto 'solicitation' na linha da tabela
  //       },
  //       (error) => {
  //         console.error('Erro ao criar solicitação:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID de serviço não está definido.');
  //   }
  // }



  // onSubmit(row: any): void {
  //   const userId = this.tokenStorageService.getUser().id;
  //   const serviceId = row?.id; // Obtém diretamente o ID do serviço
  //
  //   if (serviceId) { // Verifica se serviceId está definido antes de prosseguir
  //     this.solicitationService.createSolicitation(userId, serviceId).subscribe(
  //       (solicitation) => {
  //         // Lógica para tratamento de sucesso
  //         console.log('Solicitação criada com sucesso:', solicitation);
  //         console.log(row.solicitations?.status);
  //       },
  //       (error) => {
  //         // Lógica para tratamento de erro
  //         console.error('Erro ao criar solicitação:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID de serviço não está definido.');
  //   }
  // }


  // findPageable(page: number, size: number): void {
  //   this.servicingService.findPageable(page, size).subscribe(
  //     response => {
  //       this.services = response.content;
  //
  //       // Iterar sobre os serviços e buscar as solicitações para cada serviço
  //       for (const service of this.services) {
  //         this.solicitationService.getSolicitationsByServiceId(service?.id).subscribe(
  //           solicitations => {
  //             service.solicitations = solicitations;
  //             service.solicitationStatus = solicitations.length > 0 ? solicitations[0].status : null;
  //             service.buttonProperties = {
  //               color: solicitations.length > 0 ? 'red' : 'green',
  //               text: solicitations.length > 0 ? 'Solicitado' : 'Solicitar'
  //             };
  //           },
  //           error => console.log(error)
  //         );
  //       }
  //
  //       // this.pageIndex = response.number;
  //       this.pageNumber = response.number;
  //       this.totalElements = response.totalElements;
  //       this.pageSize = response.size;
  //     },
  //     error => console.log(error)
  //   );
  // }


  findPageable(page = 0, size = 10): void {
    this.servicingService.findPageable(page, size).subscribe((response) => {
      this.service = response.content;
      console.log(this.service);
      console.log(response.content);
      this.totalElements = response.totalElements;
      this.pageNumber = response.number;

      // Percorra os serviços e atribua o status da solicitação a cada serviço
      for (const service of this.service) {
        if (service.solicitations && service.solicitations.length > 0) {
          service.solicitationStatus = new Solicitation({ status: 'SOLICITED' });
          service.buttonProperties = { color: 'red', text: 'Solicitado' };
          console.log(service.solicitationStatus.status);

        } else {
          service.solicitationStatus = new Solicitation({ status: 'SOLICIT' });
          service.buttonProperties = { color: 'green', text: 'Solicitar' };
          // console.log(service.solicitationStatus.status);

        }
        console.log(service.solicitationStatus.status);
      }
    });
  }


  // findPageable(page = 0, size = 10): void {
  //   this.servicingService.findPageable(page, size).subscribe((response) => {
  //     console.log(response.content);
  //     this.service = response.content;
  //     this.totalElementos = response.totalElements;
  //     this.pageNumber = response.number;
  //   });
  // }

  paging(event: PageEvent): void{
    this.pageNumber = event.pageIndex;
    this.findPageable(this.pageNumber, this.pageSize);
  }

  // soliciting(serviceId: Servicing, request: Solicitation): void {
  //   const solicitation: Solicitation = {
  //     // serviceId: row.service.id, // Preencha com o valor correto para o ID do serviço
  //     userId: this.tokenStorageService.getUser().id, // Preencha com o ID do usuário, se necessário
  //     date: new Date().toISOString().split('T')[0], // Obtém a data atual no formato 'yyyy-MM-dd'
  //     hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Obtém a hora atual no formato 'HH:mm'
  //
  //   };
  //
  //   this.servicingService.soliciting(serviceId.id, request).subscribe((response) => {
  //     console.log(response);
  //     solicitation.serviceId = !solicitation.serviceId;
  //   });
  // }

  // uploadFoto(event, servicing): void {
  //   const files = event.target.files;
  //   if (files) {
  //     const image = files[0];
  //     const formData: FormData = new FormData();
  //     formData.append('image', image);
  //
  //     this.servicingService.upload(servicing, formData).subscribe((response) => this.findPageable());
  //   }
  // }


}
