import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenAiService } from '../../services/open-ai.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  animationClass = '';
  userMessage = '';
  messages: { text: string; isUser: boolean }[] = [];

  constructor(private openAiService: OpenAiService) {}

  ngOnInit() {
    this.messages.push({ text: '¿Tienes alguna duda sobre los productos?', isUser: false });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.animationClass = this.isOpen ? 'open-animation' : 'close-animation';
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      const userMessageObj = { text: this.userMessage, isUser: true };
      this.messages.push(userMessageObj);
      const previousMessage = this.userMessage;
      this.userMessage = '';

      this.openAiService.createNewChatStream({
        model: 'gpt-3.5-turbo',  // Asegúrate de usar el modelo correcto aquí
        messages: [{ role: 'user', content: previousMessage }],
        stream: true
      }).subscribe({
        next: (response) => {
          this.messages.push({ text: response, isUser: false });
          const messageContainer = document.getElementById('messageContainer');
          if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        },
        error: (error) => {
          console.error('Error al crear el chat stream:', error);
        }
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    // Optional: Add resize logic if needed
  }
}
