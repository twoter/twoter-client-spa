import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';

@Injectable()
export class CommentService {

  constructor(private http: CHttp) { }

  public getCommentsForUpdate(updateId: number) {

  }
}
