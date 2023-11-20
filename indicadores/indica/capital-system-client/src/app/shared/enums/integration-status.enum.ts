export class IntegrationStatus {
    static integrationStatus = [
      { value: 'E', label: 'Erro', color: 'color-07' },
      { value: 'P', label: 'Pendente', color: 'color-08' },
      { value: 'I', label: 'Integrando', color: 'color-06' },
      { value: 'C', label: 'Concluída', color: 'color-10' },
      { value: 'A', label: 'Aguardando Integração', color: 'color-05' },
    ];
  
    static getDescription(value:String) {
      let _item = this.integrationStatus.find(item => item.value == value);
      if (_item)
        return _item.label;
      return '';
    }
  
    static getIntegrationStatusColor(value:string) {
      let _item = this.integrationStatus.find(item => item.value == value);
      if (_item)
        return _item.color;
      return '';
    } 
  
  }