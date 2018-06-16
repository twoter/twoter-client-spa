import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: CHttp) { }

  public getById(id: number) {
    return this.http.get(environment.api_url + 'user/' + id);
  }

  public update(data: any) {
    return this.http.put(environment.api_url + 'user', data);
  }

}
