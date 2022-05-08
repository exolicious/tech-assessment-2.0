const https = require('https');
const fs = require('fs');
const path = require('path');

var httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.resolve(__dirname, '../ca.cer')),
  });

  module.exports = httpsAgent;