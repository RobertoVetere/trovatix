

import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent  {

  isLoggedIn: boolean = false;
  username: string = '';
  isUserMenuOpen = false;
  private routerSubscription: Subscription | undefined;
  profileImage: string = '';
fullName: any;
email: any;

  constructor(private router: Router, ) {}

 


   

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    console.log('Menu state:', this.isUserMenuOpen);
  }

}