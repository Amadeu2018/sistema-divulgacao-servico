import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServicingComponent } from './delete-servicing.component';

describe('DeleteServicingComponent', () => {
  let component: DeleteServicingComponent;
  let fixture: ComponentFixture<DeleteServicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteServicingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
