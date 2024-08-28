export interface GoogleSearchInfo {
  title?: string;         // Opcional
  contextLink?: string;   // Opcional
  linkImage?: string;     // Opcional
  thumbnailLink?: string; // Opcional
}
export interface Product {
  nombre: string;
  enlaceBusquedaProducto: string;
  caracteristicas: string;
  puntosFuertes: string;
  puntosDebiles: string;
  puntuacion: string;
  resumenResenas: string;
  googleSearchInfo?: GoogleSearchInfo; 
  seoArticleHtml?: string;
}