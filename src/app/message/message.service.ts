import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiUrl + '/v1/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getMessages() {
    let messages: any [] = [];
    this.http.get(BACKEND_URL).subscribe(x => console.log(x))
    return messages;

  }
}
