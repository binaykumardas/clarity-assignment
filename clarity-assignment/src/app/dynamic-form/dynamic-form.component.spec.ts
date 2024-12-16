import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../form-builder.service';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilderService]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render fields dynamically', () => {
    const formDefinition = [
      { name: 'Order No', fieldtype: 'text', validator: ['required'] },
      { name: 'OrderedDate', fieldtype: 'date', validator: [] }
    ];
    component.formDefinition = formDefinition;
    component.ngOnInit();

    expect(component.dynamicForm.contains('Order No')).toBeTrue();
    expect(component.dynamicForm.contains('OrderedDate')).toBeTrue();
  });

  it('should validate required fields', () => {
    const formDefinition = [
      { name: 'Order No', fieldtype: 'text', validator: ['required'] }
    ];
    component.formDefinition = formDefinition;
    component.ngOnInit();

    const orderNoControl = component.dynamicForm.get('Order No');
    orderNoControl?.setValue('');

    expect(orderNoControl?.valid).toBeFalse();
  });
});

