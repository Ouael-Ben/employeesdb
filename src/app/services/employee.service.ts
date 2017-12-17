import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Employee} from '../Employee';
import 'rxjs/add/operator/map';
@Injectable()
export class EmployeeService {
  employees:Observable<any[]>;
  employee:Observable<any>;
  employees1:any[];
  constructor(private af:AngularFireDatabase) { 
    /* this.af.list('/employees/employees').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      return items.map(item => item.key);
    }); */
    
    
    this.employees=this.af.list('/employees/employees').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }
  getEmployees():Observable<any[]>{
    return this.employees;
  }
  addEmployee(employee:Employee){
  const  afList=this.af.list('/employees/employees');
  afList.push(employee);
  }
  getEmployee(id:string){
    this.employee=this.af.object('/employees/employees/'+id).snapshotChanges().map(actions => {
      return { key: actions.key, ...actions.payload.val() };
    });
    return this.employee;
  }

  updateEmployee(id:string,employee:Employee){
    const itemRef = this.af.object('/employees/employees/'+id);
    itemRef.update(employee);
  }
  deleteEmployee(id:string){
    const itemRef = this.af.object('/employees/employees/'+id);
    itemRef.remove();
  }
  
}
