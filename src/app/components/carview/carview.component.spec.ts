import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarviewComponent } from './carview.component';

describe('CarviewComponent', () => {
  let component: CarviewComponent;
  let fixture: ComponentFixture<CarviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
