import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value);
  }

}