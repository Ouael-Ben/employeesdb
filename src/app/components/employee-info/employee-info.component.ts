import { Component, OnInit } from '@angular/core';
import {Employee} from '../../Employee';
import {EmployeeService} from '../../services/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  id:string;
  employee:Employee;
  hasSalary:boolean=false;
  updateSalary:boolean=false;
  showSalaryUpdate:boolean=false;
  constructor(private employeeService:EmployeeService,private router :Router,private activatedRoute:ActivatedRoute, private flashMessagesService :FlashMessagesService ) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe(employee=>{
      if(employee.key==null){
        
        this.router.navigate(['/']);
        
      }
      if(employee.salary>0){
        this.hasSalary=true;
      }
      
      this.employee=employee;
    })
  }
  updateSalaryEmployee(id:string){
    this.employeeService.updateEmployee(this.id,this.employee);
    this.flashMessagesService.show("Salary Updated Successfully !",{cssClass:'alert-success',timeout:6000});
    this.router.navigate(['/employee/'+this.id]);
  }
  myDelete(){
    this.employeeService.deleteEmployee(this.id);
    this.flashMessagesService.show("Delete Successfully !",{cssClass:'alert-danger',timeout:6000});
    this.router.navigate(['/']);
  }
}
