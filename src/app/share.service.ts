import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  isAppStarted: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
