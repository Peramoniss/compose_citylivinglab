import { Pipe, PipeTransform } from "@angular/core";
import { PeriodTypesEnum } from "../enums/period.enum";

@Pipe({
  name: 'periodPipe'
})
export class PeriodPipe implements PipeTransform {
  transform(value:any) {
    return PeriodTypesEnum.getPeriodTypesDescription(value);
  }
}