import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSolicitationComponent } from './delete-solicitation.component';

describe('DeleteSolicitationComponent', () => {
  let component: DeleteSolicitationComponent;
  let fixture: ComponentFixture<DeleteSolicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSolicitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSolicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
