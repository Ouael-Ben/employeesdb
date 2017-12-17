import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../Employee';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[];
  totalEmployees:number;
  totalSalarySum:number;
  constructor(private employeservice:EmployeeService) { 

  }

  ngOnInit() {
    this.employeservice.getEmployees().subscribe(employees=>{
      this.employees=employees;
      console.log(this.employees[0].email);
      this.getTotalEmployees();
    });
  }
  getTotalEmployees(){
    let total=0;
    let totalSalary=0;
    for(let i=0;i<this.employees.length;i++){
      total+=1;
      totalSalary+=parseFloat(this.employees[i].salary.toString());
    }
    this.totalEmployees=total;
    this.totalSalarySum=totalSalary;
    console.log(this.totalEmployees);
    console.log(this.totalSalarySum);
  }

}
