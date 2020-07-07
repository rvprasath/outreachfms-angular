import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPocComponent } from './add-poc.component';

describe('AddPocComponent', () => {
  let component: AddPocComponent;
  let fixture: ComponentFixture<AddPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
