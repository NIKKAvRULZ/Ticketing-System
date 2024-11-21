import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Component({
  selector: 'app-dashboard', // this should match the HTML tag in app.component.html
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tickets: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.apiService.getTickets().subscribe((data: any[]) => {
      this.tickets = data;
    });
  }
}
