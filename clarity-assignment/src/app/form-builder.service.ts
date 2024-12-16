import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fb: FormBuilder) { }

  buildForm(formDefinition: any[]): FormGroup {
    const group: any = {};

    formDefinition.forEach(field => {
      const validators = [];
      // Ensure `validator` exists and is an array
      const fieldValidators = field.validator || [];

      if (fieldValidators.includes('required')) {
        validators.push(Validators.required);
      }

      group[field.name] = this.fb.control('', validators);
    });

    return this.fb.group(group);
  }
}
