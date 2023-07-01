import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SolicitationService} from '../../_services/solicitation.service';
import {Solicitation} from '../../model/solicitation.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-solicitation',
  templateUrl: './delete-solicitation.component.html',
  styleUrls: ['./delete-solicitation.component.css']
})
export class DeleteSolicitationComponent implements OnInit {

  solicitation: Solicitation;

  constructor(private service: SolicitationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<DeleteSolicitationComponent>,
              @Inject(MAT_DIALOG_DATA) public solicitations: Solicitation
  ) {
    this.solicitation = new Solicitation();
  }

  ngOnInit(): void {
      this.solicitation = { ...this.solicitations };
  }

  delete(): void {
    this.service.delete(this.solicitation.id, this.solicitation).subscribe(
      (response) => {
        console.log(response);
        this.service.openSnackBar('Solicitation deleted successfully', 'Fechar');
        this.router.navigate(['/solicitations']);
      },
      (error) => {
        this.service.openSnackBar('Error deleting solicitation', 'Fechar');
        console.log(error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
