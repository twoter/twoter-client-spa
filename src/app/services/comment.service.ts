import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService {

  constructor(private http: CHttp) { }

  public getCommentsForUpdate(updateId: number, page: number) {
    const params: any = {};
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'comment/list/' + updateId, {
      params: params
    });
  }

  public createComment(data: { content: string, updateId: number }) {
    return this.http.post(environment.api_url + 'comment', data);
  }

}
