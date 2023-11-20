import { Pipe, PipeTransform } from "@angular/core";
import { PeriodMonthEnum } from "../enums/period.enum";

@Pipe({
  name: 'monthPeriod'
})
export class MonthPeriodPipe implements PipeTransform {
  transform(value:any) {
    return PeriodMonthEnum.getPeriodMonthDateDescription(value);
  }
}