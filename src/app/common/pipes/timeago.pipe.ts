import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date): string {
    const date = new Date(value);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const key in intervals) {
      const count = Math.floor(secondsAgo / intervals[key]);
      if (count > 0) {
        return `${count} ${key}${count !== 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  }
}
