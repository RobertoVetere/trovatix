import { Component, Input, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seo-products-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seo-products-review.component.html',
  styleUrls: ['./seo-products-review.component.css']
})
export class SeoProductsReviewComponent implements OnInit {
scrollToTop() {
throw new Error('Method not implemented.');
}

    @ViewChild('seoContent', { static: false }) seoContent!: ElementRef; // Referencia al contenedor del contenido SEO



   ngOnInit(): void {
    this.seoHtmlContent = ''
  }
  
  @Input() seoHtmlContent: string = ''; 
  @Input() tituloSeo: string = '';

   scrollToSeoContent(): void {
    if (this.seoContent) {
      this.seoContent.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
