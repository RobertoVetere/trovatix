import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

   @Input() product!: Product;

   isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleImageSize(event: Event) {
  const image = event.target as HTMLImageElement;
  if (image.classList.contains('enlarged')) {
    image.classList.remove('enlarged');
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';
  } else {
    image.classList.add('enlarged');
    image.style.maxWidth = 'none';
    image.style.maxHeight = 'none';
  }
}

}
