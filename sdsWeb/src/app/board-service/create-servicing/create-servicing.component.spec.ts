import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicingComponent } from './create-servicing.component';

describe('CreateServicingComponent', () => {
  let component: CreateServicingComponent;
  let fixture: ComponentFixture<CreateServicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServicingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
