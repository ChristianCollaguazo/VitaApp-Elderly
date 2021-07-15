import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VitaappService } from '../vitaapp/vitaapp.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private vitaapp: VitaappService) {}

  public setSession(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public logOut(): void {
    localStorage.clear();
    this.vitaapp.reloadData();
    this.router.navigateByUrl('/login');
  }

  public verifyToken(): Observable<any> {
    return this.vitaapp.validToken();
  }
}
