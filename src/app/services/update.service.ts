import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UpdateService {

  constructor(private http: CHttp) { }

  public getUpdates(page?: number) {
    const params: any = {};
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'update/list', {
      params: params
    });
  }

  public searchUpdates(query: string, page?: number) {
    const params: any = { query };
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'update/list', {
      params: params
    });
  }


  public createUpdate(data: { content: string }) {
    return this.http.post(environment.api_url + 'update', data);
  }

  public likeUpdate(updateId: number) {
    return this.http.put(environment.api_url + 'update/like/' + updateId);
  }

  public unlikeUpdate(updateId: number) {
    return this.http.put(environment.api_url + 'update/unlike/' + updateId);
  }

}
