import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { ResponseContentType } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000';

@Injectable()
export class WidgetsServiceService {
  constructor(private http: HttpClient) { }

  downloadPdf(filename, filetype): any {
    return this.http.get('http://localhost:8080/image/' + filename,
    { responseType: 'arraybuffer' });
  }

  showFileNames() {
    return this.http.get('http://localhost:8080/files');
  }

  RemoveFile() {
  return this.http.get('http://localhost:8080/files');
}

}


