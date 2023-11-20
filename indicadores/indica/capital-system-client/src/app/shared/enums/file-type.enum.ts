export class FileTypeEnum
{
    public static fileTypeTypes = [
        { value: 'csv', label:'CSV'},
        //{ value: 'xls', label:'XLS' }
    ];

    public static getFileTypeDescription(value:String):string {
        for(let i in this.fileTypeTypes) {
            if(this.fileTypeTypes[i].value == value) {
                return this.fileTypeTypes[i].label;
            }
        }
        return '';
    }
}