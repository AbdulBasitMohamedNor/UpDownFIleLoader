import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxUploaderModule } from 'ngx-uploader';
import {FileUploadModule} from 'ng2-file-upload';
import {  HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ImagefiilesComponent } from './imagefiiles/imagefiiles.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetDetailComponent } from './widgets/widget-detail/widget-detail.component';
import { WidgetsListComponent } from './widgets/widgets-list/widgets-list.component';
import {WidgetsServiceService} from './widgets/ServiceModel/widgets-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ImagefiilesComponent,
    WidgetsComponent,
    WidgetDetailComponent,
    WidgetsListComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    NgxUploaderModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [WidgetsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
