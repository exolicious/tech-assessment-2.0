const express = require('express');
const axios = require('axios');

const app = express();
const port = 6000;

app.listen(port, () => console.log(`Server started and listening on port ${port}`))



const router = require('./routes/api/accounts');

app.use('/api/accounts', router);