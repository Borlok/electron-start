import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Role} from "./model/role.enum";

const BACKEND_URL = environment.apiUrl + '/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loginEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginEventForMode: EventEmitter<any> = new EventEmitter<any>();
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectingCompanyEvent: EventEmitter<any> = new EventEmitter<any>();
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private customerId: string;
  private roles: string[];
  private isAdmin = false;
  private isUser = false;
  private companyId: string;
  private companyName: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const authData = {email: username, password: password};
    this.http.post<{ token: string, customerId: string, role: string }>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        this.token = response.token;
        this.customerId = response.customerId;
        if (this.token) {
          this.isAuthenticated = true;
          this.roles = JSON.parse(atob(this.token.split('.')[1])).roles;
          if (this.roles.includes(Role.Admin)) {
            this.isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
          }
          this.authStatusListener.next(true);
          this.saveAuthData(this.token, this.customerId, this.roles);
          this.loginEvent.next(this.roles.includes(Role.Admin));
          this.loginEventForMode.next(this.roles);
          this.router.navigate(['']);
        }
      }, error => {
        console.log(`Oops,something went wrong. during login...  ${JSON.stringify(error.error)}`);
        this.authStatusListener.next(false);
        return 'false'
      });
  }

  logout() {
    clearTimeout(this.tokenTimer);
    this.clearServiceData();
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.logoutEvent.next(true);
    this.router.navigate(['']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.customerId = authInformation.customerId;
    this.companyId = authInformation.companyId;
    this.roles = authInformation.roles;
    this.companyName = authInformation.companyName;
    this.isAuthenticated = true;
    if (this.roles.includes(Role.Admin)) {
      this.isAdmin = true;
    } else if (this.roles.includes(Role.User)) {
      this.isUser = true;
    }
    this.authStatusListener.next(true);
  }

  private saveAuthData(token: string, customerId: string, listRoles) {
    localStorage.setItem('token', token);
    localStorage.setItem('customerId', customerId);
    this.setListRolesToStorage('roles', listRoles);
  }

  private setListRolesToStorage(key: string, list: string[]) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  private getListRolesFromStorage(key: string): string[] {
    return JSON.parse(localStorage.getItem(key));
  }

  private clearServiceData() {
    this.isAuthenticated = false;
    this.userId = null;
    this.companyId = null;
    this.companyName = null;
    this.isAdmin = false;
  }

  private clearAuthData() {
    localStorage.clear();
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');
    const listRoles = this.getListRolesFromStorage('roles');
    const companyId = localStorage.getItem('companyId');
    const companyName = localStorage.getItem('companyName');

    if (!token) {
      return '';
    }
    return {token: token, customerId: customerId, roles: listRoles, companyId: companyId, companyName: companyName};
  }

  public setCompanyId(companyId: string) {
    localStorage.setItem('companyId', companyId);
    this.companyId = companyId;
    this.selectingCompanyEvent.next(true);
  }

  public setCompanyName(companyName: string) {
    localStorage.setItem('companyName', companyName);
    this.companyName = companyName;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getCustomerId(): string {
    return this.customerId;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsUser() {
    return this.isUser;
  }

  getRoles() {
    return this.roles;
  }

  getCompanyId() {
    return this.companyId;

  }
  getCompanyName() {
    return this.companyName;
  }
}
