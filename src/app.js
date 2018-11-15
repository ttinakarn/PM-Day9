const path = require('path');
const ejs = require('ejs');
const express = require('express');
const morgan = require('morgan');
const todos = require('./routes/todos');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.render('index', {
    name: "Tinakarn",
    sports: ["Swimming", "Tennis"]
  });
});

app.use('/todos', todos);

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});