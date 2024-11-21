import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';  // Import the DashboardComponent
import { MatButtonModule } from '@angular/material/button'; // Material Button Module
import { MatInputModule } from '@angular/material/input'; // Material Input Module
import { MatListModule } from '@angular/material/list'; // Material List Module
import { FormsModule } from '@angular/forms'; // For ngModel

@NgModule({
  declarations: [
    DashboardComponent // Declare the DashboardComponent
  ],
  imports: [
    CommonModule,  // Ensure CommonModule is imported for common Angular directives like ngIf and ngFor
    MatButtonModule, // Material Button Module
    MatInputModule,  // Material Input Module
    MatListModule,   // Material List Module
    FormsModule      // To support ngModel
  ],
  exports: [
    DashboardComponent // Export the DashboardComponent to make it available in other modules
  ]
})
export class DashboardModule {}
