import { Component, OnInit } from '@angular/core';
import {Employee} from '../../Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
employee:Employee={
  firstName:"",
  lastName:"",
  email:"",
  country:"",
  city:"",
  phone:0,
  salary:0
};
disableSalary:boolean=true;
  constructor(public flashMessagesService: FlashMessagesService,private router:Router,private employeeService :EmployeeService,private settingsService:SettingsService) { }

  ngOnInit() {
    this.disableSalary=this.settingsService.getSettings().disableSalary;
  }
  mySubmit({value,valid}:{value:Employee,valid:boolean}){
    if(this.disableSalary){
      value.salary=0;
    }
    if(!valid){
      //console.log("not correct");
      this.flashMessagesService.show('please write correct info',{cssClass:'alert alert-danger', timeout: 13000});
      this.router.navigate(['add-employee']);
    }else {
      this.employeeService.addEmployee(value);
      this.router.navigate(['/']);
      console.log("correct");
      console.log(this.employee);
    }
  }
}
