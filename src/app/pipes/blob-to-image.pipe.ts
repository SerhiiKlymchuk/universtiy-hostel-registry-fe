import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'blobToImage'
})
export class BlobToImagePipe implements PipeTransform {

  transform(value: File | null, ...args: unknown[]): unknown {
    if(value) {
      return URL.createObjectURL(value);
    }
    return value;
  }

}
