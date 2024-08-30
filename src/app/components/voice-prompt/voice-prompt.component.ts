import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voice-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-prompt.component.html',
  styleUrls: ['./voice-prompt.component.css']
})
export class VoicePromptComponent implements OnInit {
  @Input() isModalOpen: boolean = false; // Aceptar un valor de input 
  @Output() close = new EventEmitter<void>();
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  isRecording = false;

  ngOnInit(): void {
    // Puedes agregar lógica adicional si es necesario
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.close.emit();
  }

  startRecording(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log('Recording stopped. Audio URL:', audioUrl);
          
          // Abre la URL en una nueva pestaña
          window.open(audioUrl, '_blank');
        };
        this.mediaRecorder.start();
        this.isRecording = true;
      }).catch(error => {
        console.error('Error accessing microphone:', error);
      });
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }
}
