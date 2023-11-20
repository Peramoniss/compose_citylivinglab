const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// create express app
const app = express();

app.use((req,res,next) =>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  app.use(cors());
  next();
});

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Connected server");
});

// Require filebase routes
const fileBaseRoutes = require('./src/routes/filebase.routes')

// using as middleware
app.use('/api/v1/filebases', fileBaseRoutes)

// Require filebase routes
const indicatorsField = require('./src/routes/indicators-field.routes')

// using as middleware
app.use('/api/v1/indicatorsField', indicatorsField)

// Require filebase routes
const indicators = require('./src/routes/indicators.routes')

// using as middleware
app.use('/api/v1/indicators', indicators)

// Require filebase routes
const categories = require('./src/routes/categories.routes')

// using as middleware
app.use('/api/v1/categories', categories)

// Require filebase routes
const filters = require('./src/routes/filters.routes')

// using as middleware
app.use('/api/v1/filters', filters)

// Require filebase routes
const calculationField = require('./src/routes/calculation-field.routes')

// using as middleware
app.use('/api/v1/calculationField', calculationField)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});