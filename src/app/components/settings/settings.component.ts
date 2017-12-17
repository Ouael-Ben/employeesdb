import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../Settings';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;
  constructor(private router:Router,private flashMessagesService:FlashMessagesService,private settingsService:SettingsService ) { }

  ngOnInit() {
    this.settings=this.settingsService.getSettings();
  }
  mySubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Save successfully ',{cssClass:'alert alert-success', timeout: 13000});
    this.router.navigate(['/settings']);      
  }
}
