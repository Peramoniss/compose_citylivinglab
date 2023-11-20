'user strict';
const dbConn = require('../../config/db.config');

//Indicators object create
const Indicators = function(indicators){
    this.code             = indicators.code
    this.name_pt          = indicators.name_pt;
    this.name_en          = indicators.name_en;
    this.codeCategory     = indicators.codeCategory;
};

Indicators.findById = function (id, result) {
    dbConn.query("Select * from indicators where code = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const newObject = new Indicators(res[0]);
            result(null, newObject);
        }
    });   
};
Indicators.findAll = function (result) {
    dbConn.query("Select * from indicators", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

Indicators.findAllCategory = function (codeCategory,result) {
    dbConn.query("Select * from indicators where codeCategory = ?", codeCategory, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};


module.exports= Indicators;