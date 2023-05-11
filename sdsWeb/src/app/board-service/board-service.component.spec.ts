import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardServiceComponent } from './board-service.component';

describe('BoardServiceComponent', () => {
  let component: BoardServiceComponent;
  let fixture: ComponentFixture<BoardServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
