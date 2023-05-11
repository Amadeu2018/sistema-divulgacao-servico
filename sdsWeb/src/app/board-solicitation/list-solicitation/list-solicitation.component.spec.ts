import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitationComponent } from './list-solicitation.component';

describe('ListSolicitationComponent', () => {
  let component: ListSolicitationComponent;
  let fixture: ComponentFixture<ListSolicitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolicitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolicitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
