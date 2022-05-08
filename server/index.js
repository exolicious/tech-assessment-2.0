const express = require('express');
const axios = require('axios');
const history = require('connect-history-api-fallback');



const app = express();


const port = 6001;

app.listen(port, () => console.log(`Server started and listening on port ${port}`))


const router = require('./routes/api/accounts');


app.use(history()); //this is used to be able to still have the spa feel of a vue routed app, without this there would be conflicts with how vue routing works
app.use('/api/accounts', router);