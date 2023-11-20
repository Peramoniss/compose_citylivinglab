'user strict';
const dbConn = require('./../../config/db.config');

//IndicatorsField object create
const FilterIndicatorsField = function(indicatorsField){
    this.code_indicators_field = indicatorsField.codeIndicatorsField
    this.field_filter          = indicatorsField.fieldFilter;
    this.logical_op            = indicatorsField.logicalOperator;
    this.value_filter          = indicatorsField.valueFilter;
    this.filter_type           = indicatorsField.filterType;
    this.created_at            = new Date();
    this.updated_at            = new Date();
};

const FilterIndicatorsFieldReturn = function(indicatorsField){
    this.code                = indicatorsField.code;
    this.codeIndicatorsField = indicatorsField.code_indicators_field; 
    this.fieldFilter         = indicatorsField.field_filter;
    this.logicalOperator     = indicatorsField.logical_op;
    this.valueFilter         = indicatorsField.value_filter;
    this.filterType          = indicatorsField.filter_type;
    this.createDate          = indicatorsField.created_at;
    this.updateDate          = indicatorsField.updated_at;
}

FilterIndicatorsField.create = function (newFile, result) {    
    dbConn.query("INSERT INTO filters set ?", newFile, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
FilterIndicatorsField.findById = function (id, indicators_field_id, result) {
    dbConn.query("Select * from filters where code = ? and code_indicators_field = ? ", [id,indicators_field_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const newObject = new FilterIndicatorsFieldReturn(res[0]);
            result(null, newObject);
        }
    });   
};
FilterIndicatorsField.findAll = function (parans, result) {

    let indicators_field_id = parans.indicators_field_id;

    dbConn.query("Select * from filters where code_indicators_field = " + indicators_field_id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            let newObjectArray = [];

            res.forEach(indicatorsFieldObject =>{
                newObjectArray.push(new FilterIndicatorsFieldReturn(indicatorsFieldObject))
            });

            const jsonResult = {
                'filters':newObjectArray
            };
            jsonResponse = JSON.parse(JSON.stringify(jsonResult));
            result(null, jsonResponse);
        }
    });   
};

FilterIndicatorsField.update = function(id, indicators_field_id, filters, result){
  dbConn.query("UPDATE filters SET field_filter=?,logical_op=?,value_filter=?,filter_type=? WHERE code=? AND code_indicators_field=?", [filters.field_filter,filters.logical_op,filters.value_filter,filters.filter_type,id,indicators_field_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

FilterIndicatorsField.delete = function(id, indicators_field_id, result){
     dbConn.query("DELETE FROM filters WHERE code = ? AND code_indicators_field = ?", [id,indicators_field_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= FilterIndicatorsField;