import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClientModule) {}

  public uploadFile(src, file): Observable<any> {
    // console.log('src ', src, file['webkitRelativePath']);
    return of('ok');
  }

  public createFolder(folderName): Observable<any> {
    const rnd = Math.round(Math.random() * 100000); // false random
    // console.log('FolderId Created for - ', folderName, '--', rnd);
    return of(rnd);
  }
}
