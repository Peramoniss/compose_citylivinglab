

function tabelaDatatable(tabelaId, tabelaData, cabecalho, targets){

    var aoColumnData = [];

    for (let index = 0; index < cabecalho.length; index++) {
        aoColumnData.push({"mData":cabecalho[index], "sDefaultContent" : ""});
        
    }
    // console.log(mDataTabela);
    $(tabelaId).dataTable({
        "aaData": tabelaData,
        "aoColumns": aoColumnData,
        "aoColumnDefs":targets
      });
}