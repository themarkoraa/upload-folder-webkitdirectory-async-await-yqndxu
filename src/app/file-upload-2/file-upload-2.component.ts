import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-file-upload-2',
  templateUrl: './file-upload-2.component.html',
  styleUrls: ['./file-upload-2.component.css'],
})
export class FileUpload2Component implements OnInit {
  uploadedFiles = [];
  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit() {}

  uploadFiles(files: any) {
    const arrFiles = Array.from(files);
    const folderHolder = {};
    arrFiles.forEach((file) => {
      const path: string = file['webkitRelativePath'];
      const pathPieces = path.split('/');
      pathPieces.pop();
      console.log(path, pathPieces.join('/'));
      if (!folderHolder[pathPieces.join('/')]) {
        // create folder and add to folderHolder
        this.uploadFileService
          .createFolder(pathPieces.join('/'))
          .subscribe(
            (folderId) => (folderHolder[pathPieces.join('/')] = folderId)
          );
      }
    });

    //
    setTimeout(() => {
      console.log(folderHolder);
    }, 100);

    console.log(arrFiles);
  }
}
