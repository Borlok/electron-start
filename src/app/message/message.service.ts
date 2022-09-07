import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {interval, Subject, Subscription} from "rxjs";
import {Type} from "../model/type";
import {ElectronService} from "../electron/electron.service";
import {AppMessage} from "../model/app-message";

const BACKEND_URL = environment.apiUrl + '/v1/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit{
  private requestingStart: Subscription;
  private _seconds = 3;
  messages: AppMessage [] = [];
  isNewMessage: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private electronService: ElectronService) {
  }

  ngOnInit() {
  }

  private getMessages() {
    return this.http.get(BACKEND_URL)
  }

  public startApp() {
    console.log('START');
    if (this.requestingStart !== undefined) {
      this.requestingStart.unsubscribe();
    }
    this.requestingStart = interval(1000 * this._seconds)
      .subscribe(() => {
        this.getMessages().subscribe(message => {
          console.log(message)
          if (message !== null) {
            let data: AppMessage = JSON.parse(JSON.stringify(message));
            this.messages.push(data);
            this.isNewMessage.next(true);
            this.appMessageHandle({type: data.type, url: data.url, args: data.args});
          }
        });
      });
  }

  private appMessageHandle(message: AppMessage) {
    switch (message.type) {
      case Type.WRITE :
        this.electronService.addFile(message)
        break;
      case Type.EXECUTE :
        this.electronService.execute(message)
        break;
      case Type.DELETE:
        this.electronService.removeFile(message)
    }
  }

  public stopApp() {
    console.log('STOP');
    this.requestingStart.unsubscribe();
  }

  get seconds(): number {
    return this._seconds < 1 ? 1 : this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value;
  }
}
