import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssamblyaiService } from '../../services/assamblyai.service';

@Component({
  selector: 'app-voice-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-prompt.component.html',
  styleUrls: ['./voice-prompt.component.css']
})
export class VoicePromptComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() transcriptReceived = new EventEmitter<string>(); // Emite la transcripción al componente padre

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  isRecording = false;

  constructor(private assamblyaiService: AssamblyaiService) {}

  ngOnInit(): void {}

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
          
          // Enviar el archivo al servidor
          this.assamblyaiService.uploadAudio(audioBlob).subscribe(
            response => {
              console.log('Audio uploaded successfully', response);
              this.transcriptReceived.emit(response); // Emitir la transcripción al componente padre
            },
            error => {
              console.error('Error uploading audio', error);
            }
          );
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
