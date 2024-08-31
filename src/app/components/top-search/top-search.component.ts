import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
import { PerplexityService } from '../../services/perplexity.service';
import { OpenAiService } from '../../services/open-ai.service';
import { Product } from '../../interfaces/product.model';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { SeoProductsReviewComponent } from '../seo-products-review/seo-products-review.component';
import { CombineResponse } from '../../interfaces/combine-response.model';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { VoicePromptComponent } from "../voice-prompt/voice-prompt.component";
import { ReviewCardComponent } from '../review-card/review-card.component'; // Importa el componente
import { AsideMenuComponent } from '../aside-menu/aside-menu.component';

@Component({
  selector: 'app-top-search',
  standalone: true,
  imports: [
    CommonModule, // Importa CommonModule para usar directivas comunes
    ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
    LoadingOverlayComponent, 
    SeoProductsReviewComponent,
    ChatbotComponent,
    VoicePromptComponent,
    ReviewCardComponent, // Asegúrate de importar el componente aquí
    AsideMenuComponent
  ],
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
  isVoicePromptOpen: boolean = false;
  @Input() isMenuOpen: boolean = false;
  constructor(
    private perplexityService: PerplexityService,
    private openAiService: OpenAiService,
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

  ngOnInit(): void {
    this.loaderService.hide();
    this.container = document.getElementById('loaded-products-container');

    // Datos simulados
    this.products = [
      {
        nombre: 'Producto 1',
        enlaceBusquedaProducto: 'https://example.com/producto1',
        caracteristicas: 'Características destacadas del producto 1.',
        puntosFuertes: 'Alta durabilidad, buen rendimiento.',
        puntosDebiles: 'Precio alto, tamaño grande.',
        puntuacion: '8',
        resumenResenas: 'Resumen de reseñas del producto 1.',
        googleSearchInfo: {
          title: 'Producto 1',
          contextLink: 'https://example.com/producto1',
          linkImage: 'https://via.placeholder.com/150',
          thumbnailLink: 'https://via.placeholder.com/50'
        },
        seoArticleHtml: '<p>Artículo SEO para Producto 1.</p>'
      },
      {
        nombre: 'Producto 2',
        enlaceBusquedaProducto: 'https://example.com/producto2',
        caracteristicas: 'Características destacadas del producto 2.',
        puntosFuertes: 'Eficiencia energética, diseño compacto.',
        puntosDebiles: 'Capacidad limitada, ruido.',
        puntuacion: '7',
        resumenResenas: 'Resumen de reseñas del producto 2.',
        googleSearchInfo: {
          title: 'Producto 2',
          contextLink: 'https://example.com/producto2',
          linkImage: 'https://via.placeholder.com/150',
          thumbnailLink: 'https://via.placeholder.com/50'
        },
        seoArticleHtml: '<p>Artículo SEO para Producto 2.</p>'
      },
      {
        nombre: 'Producto 3',
        enlaceBusquedaProducto: 'https://example.com/producto3',
        caracteristicas: 'Características destacadas del producto 3.',
        puntosFuertes: 'Excelente relación calidad-precio, fácil de usar.',
        puntosDebiles: 'Baja compatibilidad, limitadas funciones.',
        puntuacion: '9',
        resumenResenas: 'Resumen de reseñas del producto 3.',
        googleSearchInfo: {
          title: 'Producto 3',
          contextLink: 'https://example.com/producto3',
          linkImage: 'https://via.placeholder.com/150',
          thumbnailLink: 'https://via.placeholder.com/50'
        },
        seoArticleHtml: '<p>Artículo SEO para Producto 3.</p>'
      }
    ];
  }

  ngOnDestroy(): void {
    // Implementar lógica de limpieza si es necesario
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
      }, 0);
    }

    this.loaderService.show();

    this.openAiService.validateMessage(query).pipe(
      switchMap(validation => {
        if (!this.isValidString(query)) {
          this.serviceMessage = 'La búsqueda debe ser una cadena de texto válida.';
          alert(this.serviceMessage);
          return of({ seoArticleHtml: '', products: [] });
        }

        if (validation === 'PRODUCTO') {
          return this.perplexityService.getBestProducts(query, validation);
        } else if (validation === 'SERVICIO') {
          this.serviceMessage = 'Ups, nuestra IA está aprendiendo sobre servicios, pronto estarán disponibles';
          alert(this.serviceMessage);
          return of({ seoArticleHtml: '', products: [] });
        } else if (validation === 'VIAJE') {
          this.serviceMessage = 'Ups, nuestra IA está aprendiendo sobre viajes, pronto estarán disponibles';
          alert(this.serviceMessage);
          return of({ seoArticleHtml: '', products: [] });
        } else if (validation === 'OTRO') {
          this.serviceMessage = 'Prueba con otra búsqueda';
          alert(this.serviceMessage);
          return of({ seoArticleHtml: '', products: [] });
        } else {
          this.serviceMessage = 'Validación desconocida';
          return of({ seoArticleHtml: '', products: [] });
        }
      }),
      catchError(error => {
        console.error('Error en la búsqueda:', error);
        this.serviceMessage = 'Hubo un problema con la búsqueda. Inténtalo de nuevo.';
        alert(this.serviceMessage);
        return of({ seoArticleHtml: '', products: [] });
      })
    ).subscribe({
      next: (response: CombineResponse) => {
        this.products = response.products;
        this.seoArticleHtml = response.seoArticleHtml;
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
