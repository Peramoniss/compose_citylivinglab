'user strict';
const dbConn = require('./../../config/db.config');

//FileBase object create
const FileBase = function(filebase){
    this.name             = filebase.description;
    this.url              = filebase.webSite;
    this.period           = filebase.period;
    this.month_year       = filebase.datePeriod.slice(0, 10);
    this.file_type        = filebase.fileType;
    this.head             = filebase.header;
    this.separator        = filebase.separator;
    this.directory        = filebase.directory;
    this.city_field       = filebase.cityField;
    this.integration      = filebase.integration;
    this.date_integration = this.dateIntegration;
    this.created_at       = new Date();
    this.updated_at       = new Date();
};

const FileBaseReturn = function(filebase){
    this.code            = filebase.code;
    this.description     = filebase.name;          
    this.webSite         = filebase.url;        
    this.period          = filebase.period;
    this.datePeriod      = filebase.month_year;
    this.fileType        = filebase.file_type;
    this.header          = filebase.head;
    this.separator       = filebase.separator;   
    this.directory       = filebase.directory;   
    this.cityField       = filebase.city_field;
    this.integration     = filebase.integration;
    this.dateIntegration = filebase.date_integration
    this.createDate      = filebase.created_at;
    this.updateDate      = filebase.updated_at;  
}

FileBase.create = function (newFile, result) {    
    dbConn.query("INSERT INTO filebase set ?", newFile, function (err, res) {
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
FileBase.findById = function (id, result) {
    dbConn.query("Select * from filebase where code = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            const newObject = new FileBaseReturn(res[0]);
            result(null, newObject);
        }
    });   
};
FileBase.findAll = function (parans, result) {
    const limit = parans.pageSize;
    const page = parans.page;
    const offset = (page - 1) * limit;

    dbConn.query("Select * from filebase limit " + limit + " OFFSET " + offset, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            let newObjectArray = [];

            res.forEach(fileBaseObject =>{
                newObjectArray.push(new FileBaseReturn(fileBaseObject))
            });

            const jsonResult = {
                'pageSize':res.length,
                'pageNumber':page,
                'hasNext':res.length == limit,
                'dataSource':newObjectArray
            };
            jsonResponse = JSON.parse(JSON.stringify(jsonResult));
            result(null, jsonResponse);
        }
    });   
};

FileBase.update = function(id, filebase, result){
  dbConn.query("UPDATE filebase SET name=?,url=?,period=?,month_year=?,file_type=?,head=?,directory=?,city_field=? WHERE code = ?", [filebase.name,filebase.url,filebase.period,filebase.month_year,filebase.file_type,filebase.head,filebase.directory,filebase.city_field,id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

FileBase.delete = function(id, result){
    dbConn.query("DELETE FROM calculation_field WHERE EXISTS( SELECT * FROM indicators_field WHERE indicators_field.code_filebase = " + id + " AND calculation_field.code_indicators_field = indicators_field.code)", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{  
            dbConn.query("DELETE FROM filters WHERE EXISTS( SELECT * FROM indicators_field WHERE indicators_field.code_filebase = " + id + " AND filters.code_indicators_field = indicators_field.code)", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }else{  
                    dbConn.query("DELETE FROM indicators_field WHERE indicators_field.code_filebase = " + id, function (err, res) {
                        if(err) {
                            console.log("error: ", err);
                            result(null, err);
                        }else{   
                            dbConn.query("DELETE FROM filebase WHERE code = " + id , function (err, res) {
                                if(err) {
                                    console.log("error: ", err);
                                    result(null, err);
                                }
                                else{
                                    result(null, res);
                                }
                            }); 
                        }
                    }); 
                }
            });
        }
    });
};

FileBase.updateStatusPreProcess = function(filterFilebase,result){
    dbConn.query("UPDATE filebase SET integration='A' WHERE integration in ('P','E') AND code in ("+ filterFilebase +")", function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(null, err);
          }else{   
              result(null, res);
          }
      }); 
  };

  FileBase.removeFiltersFileBase = function(id,result){
    dbConn.query("DELETE FROM filters WHERE EXISTS( SELECT * FROM indicators_field WHERE indicators_field.code_filebase = " + id + " AND filters.code_indicators_field = indicators_field.code)", function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(null, err);
          }else{   
              result(null, res);
          }
      }); 
  };

  FileBase.removeIndicatorsFieldFileBase = function(id,result){
    dbConn.query("DELETE FROM indicators_field WHERE indicators_field.code_filebase = " + id, function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(null, err);
          }else{   
              result(null, res);
          }
      }); 
  };

module.exports= FileBase;