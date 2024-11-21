import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent {
  ticketTitle: string = '';

  constructor(private apiService: ApiService) {}

  addTicket() {
    if (this.ticketTitle) {
      const ticket = { title: this.ticketTitle };
      this.apiService.addTicket(ticket).subscribe(
        (response: any) => {
          console.log('Ticket added:', response);
          // Clear the input field after submission
          this.ticketTitle = '';
        },
        (error: any) => {
          console.error('Error adding ticket:', error);
          alert('Failed to add ticket. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid ticket title');
    }
  }
}
