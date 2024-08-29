import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { PerplexityService } from '../../services/perplexity.service';
import { Product } from '../../interfaces/product.model';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { SeoProductsReviewComponent } from '../seo-products-review/seo-products-review.component';
import { CombineResponse } from '../../interfaces/combine-response.model';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-top-search',
  standalone: true,
  imports: [ChatbotComponent, ReviewCardComponent, CommonModule, ReactiveFormsModule, LoadingOverlayComponent, SeoProductsReviewComponent],
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  products: Product[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;
  seoArticleHtml: string = '';
  tituloSeo: string = 'hola';
  container: HTMLElement | null = null;
  

  constructor(
    private perplexityService: PerplexityService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.loaderService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    // Implementar lógica de limpieza si es necesario
  }

  ngOnInit(): void {
    
    this.loaderService.hide();
    this.searchForm = this.fb.group({
      query: ['']
    });

    this.container = document.getElementById('loaded-products-container');
  }

  searchProducts(): void {
    if (this.searchForm.invalid) {
      alert('Por favor, ingresa una consulta válida (mínimo 3 caracteres)');
      return;
    }

    const query = this.searchForm.value.query.trim();
    this.tituloSeo = query;

    if (query.length === 0) {
      alert('La consulta no puede estar vacía.');
      return;
    }

    this.errorMessage = null;
    this.loading = true;

    
      if (this.container) {
    this.container.classList.remove('hidden', 'expand-height-animation');
    this.container!.classList.add('open-animation');
    setTimeout(() => {
      
      this.container!.classList.add('expand-height-animation');
    }, 0); // 200 ms o el tiempo de duración de 'openChat'
  }

    this.loaderService.show();
    this.perplexityService.getBestProducts(query).pipe(
      catchError(error => {
        console.error('Error al obtener los productos:', error);
        this.errorMessage = 'Error al obtener los productos. Inténtalo de nuevo más tarde.';
        this.loading = false;
        this.loaderService.hide();
        return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío en caso de error
      })
    ).subscribe({
      next: (response: CombineResponse) => {
        this.products = response.products;
        this.seoArticleHtml = response.seoArticleHtml; // Mostrar la ventana SEO solo si hay contenido
        this.loaderService.hide();
        this.loading = false;
        this.container!.classList.remove('expand-height-animation','open-animation');
      },
      error: (err: any) => {
        console.error('Error al obtener los productos:', err);
        this.errorMessage = 'Error al obtener los productos. Inténtalo de nuevo más tarde.';
        this.loaderService.hide();
        this.loading = false;
        this.container!.classList.remove('expand-height-animation','open-animation');

      }
    });
  }

  applySuggestion(suggestion: string): void {
    this.searchForm.patchValue({ query: suggestion });
    this.searchProducts();
  }
}
