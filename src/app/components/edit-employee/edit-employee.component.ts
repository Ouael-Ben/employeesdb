import { Component, OnInit } from '@angular/core';
import {Employee} from '../../Employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import {EmployeeService} from '../../services/employee.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id:string;
  employee:Employee={
    firstName:"",
    lastName:"",
    email:"",
    country:"",
    city:"",
    phone:0,
    salary:0
  };
  isSalaryEditable:boolean;
  constructor(private employeeService:EmployeeService,private router :Router,private activatedRoute:ActivatedRoute, private flashMessagesService :FlashMessagesService,private settingsService:SettingsService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe(employee=>{
      if(employee.key==null){
        
        this.router.navigate(['/']);
        
      }
      this.employee=employee;
    });
    this.isSalaryEditable=this.settingsService.getSettings().isSalaryEditable;
  }
  mySubmit({value,valid}:{value:Employee,valid:boolean}){
    
    if(!valid){
      //console.log("not correct");
      this.flashMessagesService.show('please write correct info',{cssClass:'alert alert-danger', timeout: 13000});
      this.router.navigate(['edit-employee/'+this.id]);
    }else {
      this.employeeService.updateEmployee(this.id,value);
      this.router.navigate(['/']);
      this.flashMessagesService.show('Employee Updated Successfully ',{cssClass:'alert alert-success', timeout: 13000});      
      console.log(this.employee);
    }
  }

}
