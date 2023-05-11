import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServicingComponent } from './edit-servicing.component';

describe('EditServicingComponent', () => {
  let component: EditServicingComponent;
  let fixture: ComponentFixture<EditServicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServicingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
