import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Widget} from '../ServiceModel/widgets-model';
import {WidgetsServiceService } from '../ServiceModel/widgets-service.service';
import {Subject } from 'rxjs';
import {FileSelectDirective, FileUploader } from 'ng2-file-upload';
import {saveAs } from 'file-saver';

// const URL = 'http://localhost:8080/upload';
const URL = 'http://localhost:8080/upload';

@Component( {
selector: 'app-widget-detail',
templateUrl: './widget-detail.component.html',
styleUrls: ['./widget-detail.component.css']
})
export class WidgetDetailComponent implements OnInit {

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  attachmentList: any = [];
  public files: any = [];

originalName: string;
selectedWidget: Widget;
@Output()saved = new EventEmitter();
@Output()cancelled = new EventEmitter();

@Input()set widget(value: Widget) {
if (value) {this.originalName = value.name; }
this.selectedWidget = Object.assign( {}, value);
}
public uploader: FileUploader = new FileUploader({url: URL, itemAlias: ''});


constructor(private _FileService: WidgetsServiceService) {}

ngOnInit() {
  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    console.log('ImageUpload:uploaded:', item, status, response);
    this.attachmentList.push(JSON.parse(response));
    console.log(this.attachmentList);
    // alert('File uploaded successfully');
  };

  this._FileService.showFileNames().subscribe((response: any[]) => {
    for (let i = 0; i < response.length; i++) {
      this.attachmentList[i] = {
        filename: response[i].filename,
        filenameUrl: 'http://localhost:8080/image/'+ response[i].filename,
        originalname: response[i].originalname,
        contentType: response[i].contentType
      };

    }
  }); /**/
}



downloadPdf(filename, contentType) {
  this._FileService.downloadPdf(filename, contentType).subscribe(
    (res) => {
      const file = new Blob([res], {type: contentType });
     const fileURL = window.URL.createObjectURL(file);
     return  fileURL;
    // window.open(fileURL);
    }
  );
}
RemoveFile(Id) {

}





}
