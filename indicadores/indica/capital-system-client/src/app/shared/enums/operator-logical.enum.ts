export class OperatorLogicalEnum
{
    public static operatorLogicalTypes = [
        { value: '==', label:'Igual'},
        { value: '>', label:'Maior' },
        { value: '<', label:'Menor' },
        { value: '!=', label:'Diferente' }
    ];

    public static getOperatorLogicalTypesDescription(value:String):string {
        for(let i in this.operatorLogicalTypes) {
            if(this.operatorLogicalTypes[i].value == value) {
                return this.operatorLogicalTypes[i].label;
            }
        }
        return '';
    }
}