import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Event Ticketing System</h1>
    <app-configuration></app-configuration>
    <app-dashboard></app-dashboard>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
