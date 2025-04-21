import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPlanFormComponent } from './basic-plan-form.component';

describe('BasicPlanFormComponent', () => {
  let component: BasicPlanFormComponent;
  let fixture: ComponentFixture<BasicPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPlanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
