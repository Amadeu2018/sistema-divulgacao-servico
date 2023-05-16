import {Component, OnInit} from '@angular/core';
import {ServicingService} from '../_services/servicing.service';
import {Servicing} from '../model/servicing.model';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {EditServicingComponent} from './edit-servicing/edit-servicing.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {SolicitationService} from '../_services/solicitation.service';
import {Solicitation} from '../model/solicitation.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CreateServicingComponent} from './create-servicing/create-servicing.component';
import {DeleteServicingComponent} from './delete-servicing/delete-servicing.component';


@Component({
  selector: 'app-board-service',
  templateUrl: './board-service.component.html',
  styleUrls: ['./board-service.component.css']
})
export class BoardServiceComponent implements OnInit {


  content: string;
  servicing: Servicing;

  services: Servicing[] = [];
  // displayedColumns: string[] = ['images', 'id', 'name', 'description', 'price', 'solicitation'];

  /*Bootstrap Template*/
  form: FormGroup;
  service: Servicing[] = [];
  dataSource = ['photo', 'name', 'description', 'price', 'actions'];
  totalElementos = 0;
  pageNumber = 0;
  size = 10;
  pageSizeOptions: number[] = [5, 10, 15, 100];

  constructor(private userService: UserService, private servicingService: ServicingService, private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
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

    this.montarFormulario();
  }


  // onSubmit(): void {
  //   const solicitation = this.solicitationForm.value as Solicitation;
  //   this.solicitationService.createSolicitation(this.servicing.id, solicitation).subscribe(
  //     (newSolicitation) => {
  //       console.log('New solicitation created:', newSolicitation);
  //       this.router.navigate(['/solicitations', newSolicitation.id]);
  //     },
  //     (error) => {
  //       console.error('Error creating solicitation:', error);
  //     }
  //   );
  // }

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

  // soliciting(soliciation: Solicitation): void {
  //   this.solicitationService.soliciting(soliciation).subscribe((response) => {
  //     soliciation.service = !soliciation.service;
  //   });
  // }

  uploadFoto(event, servicing): void{
    const files = event.target.files;
    if (files) {
      const image = files[0];
      const formData: FormData = new FormData();
      formData.append('photo', image);

      this.servicingService
        .upload(servicing, formData)
        .subscribe((response) => this.findPageable());
    }
  }

  serviceDetails(id: string): void{
    this.servicingService.findById(id).subscribe(
          (response) => {
            console.log('response:', response); // verificar se a resposta do servidor é retornada corretamente
            if (!(!response || !response)) {
              this.dialog.open(CreateServicingComponent, {
                disableClose: true,
                autoFocus: true,
                data: {
                  id: response.id,
                  photo: response.photo,
                  name: response.name,
                  description: response.description,
                  price: response.price,
                }
              });
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }

  update(id: string): void {
    this.servicingService.findById(id).subscribe(
      (response) => {
        console.log('response:', response); // verificar se a resposta do servidor é retornada corretamente
        if (response && response) {
          this.dialog.open(EditServicingComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
              id: response.id,
              name: response.name,
              description: response.description,
              price: response.price,
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  delete(id: string): void {
    this.servicingService.findById(id).subscribe(
      (response) => {
        console.log('response:', response); // verificar se a resposta do servidor é retornada corretamente
        if (response && response) {
          this.dialog.open(DeleteServicingComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
              id: response.id,
              name: response.name,
              description: response.description,
              price: response.price,
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  montarFormulario(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  // submit(): void{
  //   const formValues = this.form.value;
  //   const servicing: Servicing = new Servicing(formValues.name, formValues.description, formValues.price);
  //
  //   this.servicingService.save(servicing).subscribe((response) => {
  //     console.log(response);
  //     this.findPageable();
  //     this.snackBar.open('O serviço foi adicionado!', 'Sucesso!', {
  //       duration: 2000,
  //     });
  //     this.form.reset();
  //     // let lista: Contato[] = [...this.contatos, resposta];
  //     // this.contatos = lista;
  //     // this.contatos.push(resposta); // nao atualiza a datatable pois a lista eh imutavel
  //     // console.log(this.contatos);
  //   });
  //   /**
  //    const erroNomeRequired = this.formulario.controls.nome.errors.required;
  //    const erroEmailInvalido = this.formulario.controls.email.errors.email;
  //    console.log('erroNomeRequired', erroNomeRequired);
  //    console.log('erroEmailInvalido', erroEmailInvalido);
  //    console.log(this.formulario.value);
  //    console.log('is valid', this.formulario.valid);
  //    */
  // }


  submit(name: string, description: string, price: any): void{
    const newService: Servicing = {
      name,
      description,
      price
    };

    this.servicingService.save(newService).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Service added successfully', '', {duration: 3000});
        this.router.navigate(['/service']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Error adding service', '', {duration: 3000});
      });
  }
//   services: Servicing[] = [];
//   query: '';
//   // query: string = '';
//


}
