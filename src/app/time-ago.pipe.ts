import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.getAgo(value);
  }

  private getAgo(time): string {
    const curTime = new Date().getTime() / 1000;
    let d = Math.round(curTime - time);

    let result = 'n/a';
    if (d <= 60) {
      result = 'just now';
    } else {
      d = Math.round(d / 60);
      if (d < 60) {
        result = `${d} minutes ago`;
      } else {
        d = Math.round(d / 60);
        if (d < 24) {
          result = `${d} hours ago`;
        } else {
          d = Math.round(d / 24);
          if (d <= 7) {
            result = `${d} days ago`;
          } else {
            d = Math.round(d / 7);
            if (d <= 4) {
              result = `${d} weeks ago`;
            } else {
              d = Math.round(d / 4);
              if (d < 12) {
                result = `${d} months ago`;
              } else {
                d = Math.round(d / 12);
                result = `${d} years ago`;
              }
            }
          }
        }
      }
    }

    return result;
  }

}
