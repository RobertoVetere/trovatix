import { Component, ElementRef, OnInit } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{
  

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
  setTimeout(() => {
    const container = this.elementRef.nativeElement.querySelector('#lottie-animation');
    if (container) {
      lottie.loadAnimation({
        container: container, // Asegura que el contenedor esté presente
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/loader-animation.json' // Ruta al archivo JSON de Lottie
      });
    } else {
      console.error('Contenedor no encontrado para la animación Lottie');
    }
  }, 0); 
}

}
