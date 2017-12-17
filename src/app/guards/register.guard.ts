import { Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {SettingsService} from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  
  

  constructor(private router:Router,private afh: AngularFireAuth,private settingsService:SettingsService) { }

  canActivate():boolean{
      if(this.settingsService.getSettings().isRegisterOpen){
          return true;
      }else {
          this.router.navigate(['/login']);
          return false;
      }
  }
  
  
}
