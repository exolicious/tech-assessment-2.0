const express = require('express');
const history = require('connect-history-api-fallback');

const accountsRouter = require('./routes/api/accounts');
const transactionsRouter = require('./routes/api/transactions');
const authRouter = require('./routes/api/auth');

const app = express();
const port = 6001;
app.listen(port, () => console.log(`Server started and listening on port ${port}`))

app.use(history()); //this is used to be able to still have the spa feel of a vue routed app, without this there would be conflicts with how vue routing works
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
