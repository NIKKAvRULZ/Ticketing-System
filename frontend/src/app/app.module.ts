import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    ConfigurationModule,
    DashboardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
