import { formatDate } from "@angular/common";

export class PeriodTypesEnum
{
    public static periodTypes = [
        { value: 'A', label:'Anual'},
        { value: 'M', label:'Mensal' }
    ];

    public static getPeriodTypesDescription(value:String):string {
        for(let i in this.periodTypes) {
            if(this.periodTypes[i].value == value) {
                return this.periodTypes[i].label;
            }
        }
        return '';
    }
}

export class PeriodMonthEnum
{
    public static periodMonth = [
        { value: '01', label:'Janeiro'},
        { value: '02', label:'Fevereiro'},
        { value: '03', label:'Março'},
        { value: '04', label:'Abril'},
        { value: '05', label:'Maio'},
        { value: '06', label:'Junho'},
        { value: '07', label:'Julho'},
        { value: '08', label:'Agosto'},
        { value: '09', label:'Setembro'},
        { value: '10', label:'Outubro'},
        { value: '11', label:'Novembro'},
        { value: '12', label:'Dezembro'},
    ];

    public static getPeriodMonthDescription(value:string):string {
        for(let i in this.periodMonth) {
            if(this.periodMonth[i].value == value) {
                return this.periodMonth[i].label;
            }
        }
        return '';
    }

    public static getPeriodMonthDateDescription(date:Date):string {
        var value = formatDate(date,'MM', 'en-US');
        for(let i in this.periodMonth) {
            if(this.periodMonth[i].value == value) {
                return this.periodMonth[i].label;
            }
        }
        return '';
    }
}
