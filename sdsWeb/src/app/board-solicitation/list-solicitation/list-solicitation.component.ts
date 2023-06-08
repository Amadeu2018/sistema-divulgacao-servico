import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Solicitation} from '../../model/solicitation.model';
import {SolicitationService} from '../../_services/solicitation.service';
import {Page} from '../../model/page.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-list-solicitation',
  templateUrl: './list-solicitation.component.html',
  styleUrls: ['./list-solicitation.component.css']
})
export class ListSolicitationComponent implements OnInit, AfterViewInit {

  // solicitations: Solicitation[] = [];

  // solicitation: Solicitation = {
  //   id: '',
  //   date: '',
  //   hour: '',
  //   status: '',
  //   user: '',
  //   service: ''
  // };

  page: Page<Solicitation>;

  displayedColumns: string[] = ['id', 'date', 'hour', 'status', 'user', 'service', 'acoes'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: SolicitationService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.listAll();
  }
  listAll(): void {
    const page = 0; // valor padrão para a página
    const size = 20; // valor padrão para o tamanho da página
    const solicitations: Solicitation = {
      // serviceId: row.service.id, // Preencha com o valor correto para o ID do serviço
      userId: this.tokenStorageService.getUser().displayName, // Preencha com o ID do usuário, se necessário
      // date: new Date().toISOString().split('T')[0], // Obtém a data atual no formato 'yyyy-MM-dd'
      // time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Obtém a hora atual no formato 'HH:mm'
    };
    this.service.listAll(page, size).subscribe({
      next: (pageNumber: Page<Solicitation>) => {
        console.log(pageNumber.content);
        this.dataSource.data = pageNumber.content;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => console.log(error)
    });
  }


  // Definição de templates
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getId(column: {id: string}): string {
    return column.id;
  }

  getDate(column: {date: string}): string {
    return column.date;
  }

  getHour(column: {hour: string}): string {
    return column.hour;
  }

  getStatus(column: {status: string}): string {
    return column.status;
  }

  getUser(column: {user: string}): string {
    return column.user;
  }

  getService(column: {service: string}): string {
    return column.service;
  }

  // listAll(pageNumber: number = 0, size: number = 20): void {
  //   this.service.listAll(pageNumber, size).subscribe(
  //     (page: Page<Solicitation>) => this.page = page,
  //     (error: any) => console.log(error)
  //   );
  // }
}
