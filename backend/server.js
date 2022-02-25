let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let dbConfig = require('./database/db');
// Express Route
const studentRoute = require('./routes/student.route')
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)
const app = express();
app.use(express.json());
app.use(cors());
app.use('/students', studentRoute);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});