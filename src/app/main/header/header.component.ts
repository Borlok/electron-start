import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isConnected = false;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.getAuthStatusListener()
      .subscribe(isConnected => this.isConnected = this.authService.getIsAuth()));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
