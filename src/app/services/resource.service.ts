import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ResourceService {

  constructor(private http: CHttp) { }

  public uploadFile(event: any) {
    const fileList: FileList = event.target.files;

    const file = fileList[0];

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(environment.api_url + 'image', formData)
      .map(res => res.json());
  }

}
