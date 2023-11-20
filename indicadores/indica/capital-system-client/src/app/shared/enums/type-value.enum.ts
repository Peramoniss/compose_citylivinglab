export class TypeValueEnum
{
    public static typeValueTypes = [
        { value: 'S', label:'Texto'},
        { value: 'N', label:'Número' }
    ];

    public static getTypeValueTypesDescription(value:String):string {
        for(let i in this.typeValueTypes) {
            if(this.typeValueTypes[i].value == value) {
                return this.typeValueTypes[i].label;
            }
        }
        return '';
    }
}

export class TypeFieldEnum
{
    public static typeFieldTypes = [
        { value: 'N', label:'Numérico' },
        { value: 'EXP', label:'Expressão' }
    ];

    public static getTypeFieldTypesDescription(value:String):string {
        for(let i in this.typeFieldTypes) {
            if(this.typeFieldTypes[i].value == value) {
                return this.typeFieldTypes[i].label;
            }
        }
        return '';
    }
}