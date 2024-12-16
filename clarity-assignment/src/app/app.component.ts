import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,DynamicFormComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'clarity-assignment';
  public dynamicFormData = [
    {
      "fieldtype": "text",
      "name": "Order No",
      "group": "General Information",
      "validator": ["required"]
    },
    {
      "fieldtype": "date",
      "name": "OrderedDate",
      "group": "General Information",
      "validator": ["required"]
    },
    {
      "fieldtype": "integer",
      "name": "Price",
      "group": "Product Information",
      "validator": ["required"]
    },
    {
      "fieldtype": "boolean",
      "name": "Refurbished",
      "group": "Product Information",
      "selectList": ["Yes", "No"]
    },
    {
      "fieldtype": "text",
      "name": "Address",
      "group": "Shipping Information",
      "validator": ["required"],
      "condition": "or",
      "rules": [
        {
          "field": "Order No",
          "operator": ">=",
          "value": "100"
        },
        {
          "field": "Price",
          "operator": "<=",
          "value": "100"
        }
      ]
    }
  ];
}
