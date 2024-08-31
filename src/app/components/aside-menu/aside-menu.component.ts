import { Component, Output, EventEmitter } from '@angular/core';
import { TopSearchComponent } from '../top-search/top-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [TopSearchComponent,CommonModule],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})
export class AsideMenuComponent {
  isMenuOpen = false;
    @Output() menuStateChange = new EventEmitter<boolean>();


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuStateChange.emit(this.isMenuOpen);
    const asideMenu = document.getElementById('aside-menu');
    if (asideMenu) {
      asideMenu.classList.toggle('open', this.isMenuOpen);
    }
  }
}