import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import 'rxjs/add/operator/map';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLogin:boolean;
  isUserLogin:string;
  EnableRegister:boolean;

  constructor(private router:Router,private flashMessagesService:FlashMessagesService,private authService:AuthService,private settingsService:SettingsService ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLogin=true;
        this.isUserLogin=auth.email;
      }else {
        this.isLogin=false;
      }
    });
    this.EnableRegister=this.settingsService.getSettings().isRegisterOpen;
  }
  logoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are Logout ',{cssClass:'alert alert-success', timeout: 13000});
    this.router.navigate(['/login']);      
    
  }
}
