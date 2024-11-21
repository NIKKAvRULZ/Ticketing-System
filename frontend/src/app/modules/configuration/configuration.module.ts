import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule {}
