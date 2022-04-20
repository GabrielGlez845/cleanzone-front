import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../views/models/products.model';

@Pipe({
  name: 'buscarPrenda'
})
export class BuscarPrendaPipe implements PipeTransform {

  transform(mObjects:Product[], input: string) {
    if (!input) return mObjects;
    return mObjects.filter(val => this.filterBy(val, input));
  }

  private filterBy(
    mObject: Product ,search: string
  ) {
    const reduced = Object.keys(mObject)
      .reduce((prev, current) => this.reduceKeys(prev, current, mObject), "")
      .toLocaleLowerCase();
    return reduced.indexOf(search.toLocaleLowerCase()) > -1;
  }

  private reduceKeys(
    prev: string,
    current: string,
    mObject:   Product): string {
    if (this.isProp(current)) {
      prev = `${prev}\$${mObject[current]}`;
    }
    return prev;
  }

  //Aquí validas que propiedades quieres que se filtren.
  private isProp(key: string): boolean {
    return key.includes("name");
  }


}
