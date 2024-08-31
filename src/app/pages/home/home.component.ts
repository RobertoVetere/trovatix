import { Component } from '@angular/core';
import { TopSearchComponent } from '../../components/top-search/top-search.component';
import { AsideMenuComponent } from '../../components/aside-menu/aside-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopSearchComponent, AsideMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMenuOpen: boolean = false;

  onMenuStateChange(isOpen: boolean): void {
    this.isMenuOpen = isOpen;
  }

}
