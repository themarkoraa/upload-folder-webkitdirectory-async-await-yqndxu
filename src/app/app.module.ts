import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileService } from './upload-file.service';
import { FileUpload2Component } from './file-upload-2/file-upload-2.component';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    FileUploadComponent,
    FileUpload2Component,
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
