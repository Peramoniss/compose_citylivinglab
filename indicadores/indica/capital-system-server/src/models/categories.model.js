'user strict';
const dbConn = require('../../config/db.config');

//IndicatorsField object create
const Categories = function(categories){
    this.code             = categories.dataSourceCode
    this.name_pt          = categories.field;
    this.name_en          = categories.typeField;
    this.description_pt   = categories.description_pt;
    this.description_en   = categories.description_en;
    this.type             = categories.type;
};

Categories.findById = function (id, result) {
    dbConn.query("Select * from categories where code = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Categories.findAll = function (result) {
    dbConn.query("Select * from categories", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};


module.exports= Categories;