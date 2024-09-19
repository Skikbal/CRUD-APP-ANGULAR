import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  employeeForms: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();

  employeeList: EmployeeModel[] = [];

  constructor() {
    debugger;
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForms = new FormGroup({
      empId: new FormControl(this.employeeObj.empId, [Validators.required]),
      name: new FormControl(this.employeeObj.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: new FormControl(this.employeeObj.city, [Validators.required]),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo, [
        Validators.required,
        Validators.minLength(10),
      ]),
      emailId: new FormControl(this.employeeObj.emailId, [
        Validators.required,
        Validators.email,
      ]),
      pinCode: new FormControl(this.employeeObj.pinCode, [
        Validators.required,
        Validators.minLength(6),
      ]),
      state: new FormControl(this.employeeObj.state, [Validators.required]),
    });
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForms.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForms.value);
    } else {
      debugger;
      this.employeeList.unshift(this.employeeForms.value);
      if (this.employeeList.length > 0) {
        this.employeeList[0].empId = 1;
      }
    }

    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.createForm();
  }

  onEdit(item: EmployeeModel) {
    debugger;
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId == this.employeeForms.controls['empId'].value
    );
    if (record != undefined) {
      record.address = this.employeeForms.controls['address'].value;
      record.name = this.employeeForms.controls['name'].value;
      record.city = this.employeeForms.controls['city'].value;
      record.emailId = this.employeeForms.controls['emailId'].value;
      record.pinCode = this.employeeForms.controls['pinCode'].value;
      record.state = this.employeeForms.controls['state'].value;
      record.contactNo = this.employeeForms.controls['contactNo'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.onCancel();
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you Sure want to Delete');
    if (isDelete) {
      const index = this.employeeList.findIndex((m) => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }

  onCancel() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
}
