import { Component } from '@angular/core';
import { TopSearchComponent } from '../../components/top-search/top-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
