import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Solicitation } from '../../model/solicitation.model';
import { SolicitationService } from '../../_services/solicitation.service';
import { Page } from '../../model/page.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from '../../_services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteSolicitationComponent } from '../delete-solicitation/delete-solicitation.component';
import { PageEvent } from '@angular/material/paginator';

interface SearchFilter {
  searchText: string;
  selectedStatus: string;
}

@Component({
  selector: 'app-list-solicitation',
  templateUrl: './list-solicitation.component.html',
  styleUrls: ['./list-solicitation.component.css']
})
export class ListSolicitationComponent implements OnInit, AfterViewInit {
  allSolicitationsDataSource = new MatTableDataSource<Solicitation>();
  statusTrueDataSource = new MatTableDataSource<Solicitation>();
  statusFalseDataSource = new MatTableDataSource<Solicitation>();

  page: Page<Solicitation>;
  searchFilter: SearchFilter = {
    searchText: '',
    selectedStatus: ''
  };

  displayedColumns: string[] = ['id', 'date', 'hour', 'user', 'service', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort: MatSort;

  currentPage = 0;
  pageSize = 5;

  constructor(
    private service: SolicitationService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll(): void {
    this.service.listAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Solicitation>) => {
        this.page = page;
        this.updateDataSources(page.content);

        this.currentPage = page.number;
        this.pageSize = page.size;
      },
      error: (error: any) => console.log(error)
    });
  }

  ngAfterViewInit(): void {
    this.allSolicitationsDataSource.sort = this.sort;
    this.statusTrueDataSource.sort = this.sort;
    this.statusFalseDataSource.sort = this.sort;
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listAll();
  }

  updateDataSources(solicitations: Solicitation[]): void {
    this.allSolicitationsDataSource.data = solicitations;
    this.allSolicitationsDataSource.sort = this.sort;

    this.statusTrueDataSource.data = solicitations.filter(solicitation => solicitation.status);
    this.statusTrueDataSource.sort = this.sort;

    this.statusFalseDataSource.data = solicitations.filter(solicitation => !solicitation.status);
    this.statusFalseDataSource.sort = this.sort;
  }

  getId(column: { id: string }): string {
    return column.id;
  }

  getDate(column: { date: string }): string {
    return column.date;
  }

  getHour(column: { hour: string }): string {
    return column.hour;
  }

  getUser(column: { user: string }): string {
    return column.user;
  }

  getService(column: { service: string }): string {
    return column.service;
  }

  getStatus(column: { status: string }): string {
    return column.status;
  }

  getStatuSolicitation(solicitation: Solicitation): void {
    this.service.getStatus(solicitation).subscribe((response) => {
      solicitation.status = !solicitation.status;
      this.snackBar.open(
        solicitation.status ? 'Solicitação aceita' : 'Solicitação não aceita',
        'Fechar',
        { duration: 3000 }
      );
      this.listAll();
    });
  }

  delete(id: string): void {
    this.service.findById(id).subscribe(
      (response) => {
        console.log('response:', response);
        if (response && response) {
          this.dialog.open(DeleteSolicitationComponent, {
            disableClose: true,
            autoFocus: true,
            data: {
              id: response.id,
              name: response.date,
              description: response.hour,
              user: response.user.displayName,
              service: response.service.name,
              status: response.status,
            }
          });
          // this.snackBar.open('Solicitação excluída com sucesso', 'Fechar', { duration: 3000 });
          this.listAll();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search(): void {
    let filteredSolicitations = [...this.page.content];

    if (this.searchFilter.selectedStatus === 'true') {
      filteredSolicitations = filteredSolicitations.filter(
        (solicitation) => solicitation.status === true
      );
    } else if (this.searchFilter.selectedStatus === 'false') {
      filteredSolicitations = filteredSolicitations.filter(
        (solicitation) => solicitation.status === false
      );
    }

    if (this.searchFilter.searchText) {
      const searchTextLower = this.searchFilter.searchText.toLowerCase();
      filteredSolicitations = filteredSolicitations.filter(
        (solicitation) =>
          solicitation.user.displayName.toLowerCase().includes(searchTextLower) ||
          solicitation.date.includes(searchTextLower) ||
          solicitation.hour.includes(searchTextLower) ||
          solicitation.date.toLowerCase().includes(searchTextLower) ||
          solicitation.hour.toLowerCase().includes(searchTextLower)
      );
    }

    this.updateDataSources(filteredSolicitations);
  }
}
