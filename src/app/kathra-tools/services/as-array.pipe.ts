import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'asArray',
  pure: false
})
export class AsArrayPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let array = [];
    for(let key in value) {
      array.push({key: key, value: value[key]});
    }
    return array;
  }
}