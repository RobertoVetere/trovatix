import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
import { PerplexityService } from '../../services/perplexity.service';
import { OpenAiService } from '../../services/open-ai.service'; // Asegúrate de importar OpenAiService
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
  serviceMessage: string | null = null;

  constructor(
    private perplexityService: PerplexityService,
    private openAiService: OpenAiService, // Inyectar OpenAiService
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
      this.container.classList.add('open-animation');
      setTimeout(() => {
        this.container!.classList.add('expand-height-animation');
      }, 0); // 200 ms o el tiempo de duración de 'openChat'
    }

    this.loaderService.show();

   this.openAiService.validateMessage(query).pipe(
  switchMap(validation => {
    // Validación básica de la entrada
    if (!this.isValidString(query)) {
      this.serviceMessage = 'La búsqueda debe ser una cadena de texto válida.';
      alert(this.serviceMessage);
      return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío
    }

    // Proceder con la validación y las llamadas a las APIs
    if (validation === 'PRODUCTO') {
      console.log(validation);
      return this.perplexityService.getBestProducts(query);
    } else if (validation === 'SERVICIO') {
      this.serviceMessage = 'Ups, nuestra IA está aprendiendo sobre servicios, pronto estarán disponibles'; // Mensaje de servicio
      alert(this.serviceMessage);
      return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío
    } else if (validation === 'VIAJE') {
      this.serviceMessage = 'Ups, nuestra IA está aprendiendo sobre viajes, pronto estarán disponibles'; // Mensaje de servicio
      alert(this.serviceMessage);
      return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío
    } else if (validation === 'OTRO') {
      this.serviceMessage = 'Prueba con otra búsqueda'; // Mensaje alternativo
      alert(this.serviceMessage);
      return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío
    } else {
      this.serviceMessage = 'Validación desconocida'; // Mensaje para validación desconocida
      return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío
    }
  }),
  catchError(error => {
    console.error('Error en la búsqueda:', error);
    this.serviceMessage = 'Hubo un problema con la búsqueda. Inténtalo de nuevo.';
    alert(this.serviceMessage);
    return of({ seoArticleHtml: '', products: [] }); // Devolver un objeto vacío en caso de error
  })
    ).subscribe({
      next: (response: CombineResponse) => {
        this.products = response.products;
        this.seoArticleHtml = response.seoArticleHtml; // Mostrar la ventana SEO solo si hay contenido
        this.loaderService.hide();
        this.loading = false;
        this.container?.classList.remove('expand-height-animation', 'open-animation');
      },
      error: (err: any) => {
        console.error('Error al obtener los productos:', err);
        this.errorMessage = 'Error al obtener los productos. Inténtalo de nuevo más tarde.';
        this.loaderService.hide();
        this.loading = false;
        this.container?.classList.remove('expand-height-animation', 'open-animation');
      }
    });
  }

  isValidString(input: any): boolean {
  return typeof input === 'string' && input.trim() !== '';
}


  applySuggestion(suggestion: string): void {
    this.searchForm.patchValue({ query: suggestion });
    this.searchProducts();
  }
}
