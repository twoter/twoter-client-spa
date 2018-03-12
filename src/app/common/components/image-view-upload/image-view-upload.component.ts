import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-image-view-upload',
  templateUrl: './image-view-upload.component.html',
  styleUrls: ['./image-view-upload.component.css']
})
export class ImageViewUploadComponent implements OnInit {

  @Input() public maxWidth: number;
  @Input() public maxHeight: number;
  @Output() public onChange: EventEmitter<number> = new EventEmitter();
  @ViewChild('inp') private fileInp: ElementRef;
  private imageId: number;

  constructor(private resouceService: ResourceService) { }

  ngOnInit() {
  }

  fileChange(event) {
    const URL = window.URL || window['webkitURL'];
    const file = this.fileInp.nativeElement.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if ((!this.maxWidth || img.width == this.maxWidth) &&
          (!this.maxHeight || img.height == this.maxHeight)
        ) {
          this.doUpload(event);
        } else {
          alert(`Image size must be at least ${this.maxWidth}x${this.maxHeight}`);
        }
      };
      img.src = URL.createObjectURL(file);
    }
  }

  private doUpload(files) {
    this.resouceService.uploadFile(files)
      .subscribe(
      data => {
        this.imageId = data.resourceId;
        this.onChange.emit(data.resourceId);
      },
      error => console.log(error)
      );
  }

  public triggerUpload() {
    this.fileInp.nativeElement.click();
  }

}
