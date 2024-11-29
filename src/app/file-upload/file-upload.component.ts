import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Input() acceptedFormat: string = '.pdf';
  @Input() maxSize: number = 102400;
  @Output() onSendFilesList: EventEmitter<FileItem[]> = new EventEmitter<
    FileItem[]
  >();
  wrongFilesList = [];
  filesList = [];
  uploadedFiles = [];
  constructor(private uploadFileService: UploadFileService) {}
  ngOnInit() {}

  async uploadFiles(files: any) {
    this.wrongFilesList = [];
    let _tempWrongFilesList = [];
    let _tempFilesList = [];
    const folderHolder = {};
    this.uploadedFiles = [];
    for (let file of Array.from(files)) {
      //console.log(file['webkitRelativePath'], file['size'], file['type']);
      const path: string = file['webkitRelativePath'];
      const pathPieces = path.split('/');

      if (!pathPieces.reverse()[0].startsWith('.')) {
        const currentFolder = pathPieces[1];
        //console.log('Checking for folder ', currentFolder, 'in', folderHolder);
        if (folderHolder[currentFolder]) {
          const b = await lastValueFrom(
            this.uploadFileService.uploadFile(folderHolder[currentFolder], file)
          );
          this.uploadedFiles.push({
            fileName: pathPieces[0],
            folder: currentFolder,
            folderId: folderHolder[currentFolder],
          });
        } else {
          const folderId = await lastValueFrom(
            this.uploadFileService.createFolder(currentFolder)
          );
          folderHolder[currentFolder] = folderId;

          const p = await lastValueFrom(
            this.uploadFileService.uploadFile(folderHolder[currentFolder], file)
          );
          this.uploadedFiles.push({
            fileName: pathPieces[0],
            folder: currentFolder,
            folderId: folderHolder[currentFolder],
          });
        }
      }
    }
    // console.log(this.uploadedFiles);
    /* _tempFilesList = Array.from(event.target.files);
    if (_tempFilesList.length > 0)
      _tempFilesList.forEach((file) => {
        if (this.checkFileSizeMatches(file.size)) file.wrongSize = true;
        if (this.checkFileTypesMatches(file.type)) file.wrongFormat = true;
        if (file.wrongSize || file.wrongFormat) _tempWrongFilesList.push(file);
      });

    _tempFilesList = _tempFilesList.filter(
      (elem) => elem.wrongFormat !== true && elem.wrongSize !== true
    );
    _tempFilesList.forEach((elem) => this.filesList.push(elem));

    this.wrongFilesList = [..._tempWrongFilesList];
    console.log(
      'this.filesList',
      JSON.stringify(this.filesList),
      'this.wrongFilesList ',
      this.wrongFilesList
    );
    if (this.filesList.length > 0) return this.emitFilesList(this.filesList);*/
    //else return;
  }

  emitFilesList(files: FileItem[]) {
    console.log(files);
    this.onSendFilesList.emit(files);
  }

  checkFileSizeMatches(fileSize: number): boolean {
    return parseInt((fileSize / 1024).toFixed(4)) > this.maxSize || false;
  }
  checkFileTypesMatches(fileType: string): boolean {
    console.log(fileType, this.acceptedFormat);
    if (!this.acceptedFormat.includes(fileType)) return false;
    else return fileType.match(this.acceptedFormat) === null;
  }
}

export class FileItem {
  name: string;
  size: number;
  type: string;
  wrongSize = false;
  wrongFormat = false;
}
