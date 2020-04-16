import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addBaseUrlToCover'
})
export class AddBaseUrlToCoverPipe implements PipeTransform {
  transform(cover: string): string {
    cover = cover.replace('https://goyabu.com/', '');
    return !cover.includes('https://goyabu.com/')
      ? 'https://goyabu.com/' + cover
      : cover;
  }
}
