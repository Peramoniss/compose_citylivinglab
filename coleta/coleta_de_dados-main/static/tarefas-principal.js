// tarefas-principal.jsvar $list = $('ul').sortable({
//     disabled:false,
//     update: function() {
//       var sortOrder =
//        $('ul').sortable('toArray', {attribute: 'data-z'});
//       $('.info').text(sortOrder);
//     }
//   });
  
  $(document).on('click', '[data-z]', function(e){
    var jTarget = $(e.target),
        dir = jTarget.data('dir'),
        jItem = $(e.currentTarget),
        jItems = $('li'),
        index = jItems.index(jItem);
        e.preventDefault();
    switch (dir) {
      case 'up':
        console.log(index);
        if (index != 0) {
          var item =
           $(this).detach().insertBefore(jItems[index - 1]);
        }
        break;
      case 'down':
        if (index != jItems.length - 1) {
          var item = $(this).detach().insertAfter(jItems[index + 1]);
        }
        break;
    }
    // var sortOrder = $('ul').sortable('toArray', {attribute: 'data-z'});
    // $('.info').text(sortOrder);
  });


    // https://www.npmjs.com/package/cronstrue <- for the cronjob

  function descricaoCronTraduz(){
    var cron_result = cronstrue.toString($('#cron_agendamento').val(), { locale: "pt_BR" });
    $('#descricao-cron').html(cron_result);
  }


  $(document).ready(function(){
    
  
      console.log(valor_cron);
        $('.cronagendamento')
        .jqCron({
          lang: 'pt_br',
          default_value:valor_cron,
          multiple_dom: false,
          bind_to: $('.cronagendamento-input'),
          bind_method: {
            set: function($element, value) {
              
                      $element.is(':input') ? $element.val(value) : $element.data('jqCronValue', value);
              
                    },
              
                    get: function($element) {
              
                      return $element.is(':input') ? $element.val() : $element.data('jqCronValue');
              
                    }
          }
        });
  
      // cron_agenda.enable();

    // descricaoCronTraduz();

    // $('#cron_agendamento').focusout(function(){
    //   // var cron_result = cronstrue.toString($('#cron_agendamento').val(), { locale: "pt_BR" });
    //   // $('#descricao-cron').html(cron_result);
    //   descricaoCronTraduz();
    // });



    //group add limit
    console.log("1");
    
    //add more fields group
    $(".adicionarEtapa").click(function(){
        
      var lastElementDataZ = $('body').find('.etapas-group:last').attr('data-z');
      lastElementDataZ = parseInt(lastElementDataZ) + 1;
      console.log(lastElementDataZ);
      //var newElement = $(".etapas-group-copy").clone();
      //newElement.closest('a').html('<a href="javascript:void(0)" class="btn btn-danger removerEtapa"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</a>')
      var fieldHTML = '<li class="form-group etapas-group" data-z="' + lastElementDataZ + '">'+$(".etapas-group-copy").html()+'</li>';
      //var fieldHTML = '<li class="form-group etapas-group" data-z="' + lastElementDataZ + '">'+newElement.html()+'</li>';
      var strEtapa = 'id="etapa_'+lastElementDataZ+'"';
      var nameEtapa = 'name="etapa_'+lastElementDataZ+'"';
      var strTipoAcao = 'id="id_tipo_acao_'+lastElementDataZ+'"';
      var nameTipoAcao = 'name="id_tipo_acao_'+lastElementDataZ+'"';
      var strTipoEtapa = 'id="id_tipo_etapa_'+lastElementDataZ+'"';
      var nameTipoEtapa = 'name="id_tipo_etapa_'+lastElementDataZ+'"';
      fieldHTML = fieldHTML.replace('id="etapa_0"', strEtapa);
      fieldHTML = fieldHTML.replace('id="id_tipo_acao"', strTipoAcao);
      fieldHTML = fieldHTML.replace('name="id_tipo_acao"', nameTipoAcao);
      fieldHTML = fieldHTML.replace('id="id_tipo_etapa"', strTipoEtapa);
      fieldHTML = fieldHTML.replace('name="id_tipo_etapa"', nameTipoEtapa);
      fieldHTML = fieldHTML.replace('name="etapa"', nameEtapa);
        $('body').find('.etapas-group:last').after(fieldHTML);
    
    });
    
    //remove fields group
    $("body").on("click",".removerEtapa",function(){ 
        $(this).parents(".etapas-group").remove();
    });
});