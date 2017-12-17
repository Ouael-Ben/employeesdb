import { Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGuard implements CanActivate {
  
  

  constructor(private router:Router,private afh: AngularFireAuth) { }

  canActivate():Observable<boolean>{
      return this.afh.authState.map(auth=>{
          if(!auth){
              this.router.navigate(['/login']);
              return false;
          }else {
              return true;
          }
      });
  }
  
  
}
