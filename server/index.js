// const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/products', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
