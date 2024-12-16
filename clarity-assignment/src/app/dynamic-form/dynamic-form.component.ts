import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../form-builder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {

  @Input() formDefinition: any[] = [];
  dynamicForm!: FormGroup;
  groupedFormDefinition: any[] = [];

  constructor(private fb: FormBuilder, private formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.groupedFormDefinition = this.groupFieldsByGroup(this.formDefinition);
    this.dynamicForm = this.formBuilderService.buildForm(this.formDefinition);
  }

  groupFieldsByGroup(formDefinition: any[]): any[] {
    const groups:any = {};

    formDefinition.forEach(field => {
      if (!groups[field.group]) {
        groups[field.group] = { group: field.group, fields: [] };
      }
      groups[field.group].fields.push(field);
    });

    return Object.values(groups);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    } else {
      alert('Please fill out all mandatory fields.');
    }
  }

}
