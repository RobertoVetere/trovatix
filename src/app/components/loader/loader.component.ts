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
    lottie.loadAnimation({
      container: this.elementRef.nativeElement.querySelector('#lottie-animation'), // Elemento contenedor
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'loader-animation.json' // Ruta al archivo JSON de Lottie
    });
  }

}
