import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  constructor(private router:Router,private flashMessagesService:FlashMessagesService,private authService:AuthService ) { }

  ngOnInit() {
  }
  mySubmit(){
    this.authService.register(this.email,this.password).then((res)=>{
      this.flashMessagesService.show('Register successfully ',{cssClass:'alert alert-success', timeout: 13000});      
      this.router.navigate(['/']);
    }).catch((err)=>{
      this.flashMessagesService.show(err.message,{cssClass:'alert alert-danger', timeout: 13000});      
      this.router.navigate(['/register']);
    })
  }
}
