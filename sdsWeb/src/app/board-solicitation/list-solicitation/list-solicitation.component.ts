import { Component, OnInit } from '@angular/core';
import {Solicitation} from '../../model/solicitation.model';
import {SolicitationService} from '../../_services/solicitation.service';
import {Page} from '../../model/page.model';

@Component({
  selector: 'app-list-solicitation',
  templateUrl: './list-solicitation.component.html',
  styleUrls: ['./list-solicitation.component.css']
})
export class ListSolicitationComponent implements OnInit {

  solicitations: Solicitation[] = [];

  solicitation: Solicitation = {
    id: '',
    date: '',
    hour: '',
    status: '',
    user: '',
    service: ''
  };

  page: Page<Solicitation>;

  displayedColumns: string[] = ['id', 'date', 'hour', 'status', 'user', 'service', 'acoes'];

  constructor(private service: SolicitationService) { }

  ngOnInit(): void {
    this.listAll();
    // this.service.listAll()
    //   .subscribe(
    //     solicitations => this.solicitations = solicitations,
    //     error => console.log(error)
    //   );
  }
  listAll(pageNumber: number = 0, size: number = 20): void {
    this.service.listAll(pageNumber, size).subscribe(
      (page: Page<Solicitation>) => this.page = page,
      (error: any) => console.log(error)
    );
  }
}
