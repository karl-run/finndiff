const express = require('express');
const app = express();

console.log(__dirname);
app.use(express.static(__dirname + '/../web/build'));

app.listen(process.env.PORT || 3000);
