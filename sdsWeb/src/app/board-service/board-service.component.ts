import {Component, OnInit} from '@angular/core';
import {ServicingService} from '../_services/servicing.service';
import {Servicing} from '../model/servicing.model';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {EditServicingComponent} from './edit-servicing/edit-servicing.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-board-service',
  templateUrl: './board-service.component.html',
  styleUrls: ['./board-service.component.css']
})
export class BoardServiceComponent implements OnInit {

  services: Servicing[] = [];
  query: '';
  // query: string = '';

  servicing: Servicing = {
    id: '',
    name: '',
    description: '',
    price: 0,
    images: '',
    // solicitations: '',
  };

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'images', 'acoes'];

  // dataSource = new MatTableDataSource();

  constructor(private servicingService: ServicingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.servicingService.listAll()
      .subscribe(
        services => this.services = services,
        error => console.log(error)
      );
    // this.getServices();
    // this.getMaterial();
  }

  // getServices(): void {
  //   this.servicingService.findAll().subscribe(
  //     data => {
  //       console.log(data.content);
  //       this.services = data.content;
  //     }
  //   );
  // }

  // update(id: string): void {
  //   this.servicingService.findById(id).subscribe(
  //     (response) => {
  //       console.log('response:', response); // verificar se a resposta do servidor é retornada corretamente
  //       if (response && response.data) {
  //         this.dialog.open(EditServicingComponent, {
  //           disableClose: true,
  //           autoFocus: true,
  //           data: {
  //             id: response.data.id,
  //             name: response.data.name,
  //             description: response.data.description,
  //             price: response.data.price,
  //           }
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }


  // editar(id: string): void {
  //   this.servicingService.findById(id).subscribe((response) => {
  //     this.dialog.open(EditServicingComponent, {
  //       disableClose: true,
  //       autoFocus: true,
  //       data: {
  //         id: response.data.id,
  //         name: response.data.name,
  //         description: response.data.description,
  //         price: response.data.price,
  //       }
  //     });
  //   });
  // }

  /*editar(id: string): void {
    this.servicingService.findById(id).subscribe((response) => {
      console.log('response:', response); // verificar se a resposta do servidor é retornada corretamente
      if (response && response.data && response.data.id) {
        this.dialog.open(EditServicingComponent, {
          disableClose: true,
          autoFocus: true,
          data: {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
          }
        });
      } else {
        console.log('Objeto inválido ou não contém a propriedade "id"');
      }
    });
  }
*/

  searchServices(): void {
    // this.servicingService.search(this.query).subscribe(
    //   (data: Servicing[]) => {
    //     console.log(data);
    //     this.services = data;
    //   }
    // );
  }

  resetSearch(): void {
    this.query = '';
    // this.getServices();
  }

  createServices(): void {
    this.router.navigate(['/create-servicing']);
  }
}
