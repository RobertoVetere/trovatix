import { Product } from './product.model'; 

export interface CombineResponse {
  seoArticleHtml: string;
  products: Product[];
}
