'user strict';
const dbConn = require('./../../config/db.config');

//IndicatorsField object create
const CalculationField = function(indicatorsField){
    this.code_indicators_field = indicatorsField.codeIndicatorsField
    this.field                 = indicatorsField.field;
    this.field_type            = indicatorsField.fieldType;
    this.created_at            = new Date();
    this.updated_at            = new Date();
};

const CalculationFieldReturn = function(indicatorsField){
    this.code                = indicatorsField.code;
    this.codeIndicatorsField = indicatorsField.code_indicators_field; 
    this.field               = indicatorsField.field;
    this.fieldType           = indicatorsField.field_type;
    this.createDate          = indicatorsField.created_at;
    this.updateDate          = indicatorsField.updated_at;
}

CalculationField.create = function (newFile, result) {    
    dbConn.query("INSERT INTO calculation_field set ?", newFile, function (err, res) {
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
CalculationField.findById = function (id, indicators_field_id, result) {
    dbConn.query("Select * from calculation_field where code = ? and code_indicators_field = ? ", [id,indicators_field_id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const newObject = new CalculationFieldReturn(res[0]);
            result(null, newObject);
        }
    });   
};
CalculationField.findAll = function (parans, result) {

    let indicators_field_id = parans.indicators_field_id;

    dbConn.query("Select * from calculation_field where code_indicators_field = " + indicators_field_id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            let newObjectArray = [];

            res.forEach(indicatorsFieldObject =>{
                newObjectArray.push(new CalculationFieldReturn(indicatorsFieldObject))
            });

            const jsonResult = {
                'calculationField':newObjectArray
            };
            jsonResponse = JSON.parse(JSON.stringify(jsonResult));
            result(null, jsonResponse);
        }
    });   
};

CalculationField.update = function(id, indicators_field_id, calculation_field, result){
  dbConn.query("UPDATE calculation_field SET field=?,field_type=? WHERE code=? AND code_indicators_field=?", [calculation_field.field,calculation_field.field_type,id,indicators_field_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

CalculationField.delete = function(id, indicators_field_id, result){
     dbConn.query("DELETE FROM calculation_field WHERE code = ? AND code_indicators_field = ?", [id,indicators_field_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= CalculationField;