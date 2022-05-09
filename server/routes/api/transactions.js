const express = require('express');
const axios = require('axios');
const httpsAgent = require('../../misc/httpsAgent');
const roundTo5Rappen = require('../../misc/roundTo5Rappen');

const transactionsRouter = express.Router();

transactionsRouter.post('/', async (req, res) => {
    try {
        console.log("HELLO FROM TRANSACTIONS API HANDLER");
        const transactions = await getTransactions(req.body.accountId, req.body.token);
        const responseJson = createRelevantResponseJSON(transactions);
        res.json(responseJson);
    } catch(e) {
        console.error(`Error occured! Reason: ${e}`);
        throw e;
    }
});

function getTransactions(accountId, userAccessToken) {
    let toDate = new Date();
    let fromDate = new Date(toDate.getTime()-(30*24*3600000));

    return axios
        .get(`https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts/${accountId}/transactions`, { agent: httpsAgent, headers: { Authorization: `Bearer ${userAccessToken}` }, params: { toBookingDateTime: toDate.toISOString(), fromBookingDateTime: fromDate.toISOString()} })
        .then(response => {
            console.log(response.data.Data.Transaction);
            return response.data.Data.Transaction; //there are multiple entries for each accountid with the type being different, for this apps sake we just take the first entry which has type "expected"
        })
        .catch(error => {
            throw error + " inside getTransactions";
        });
}

function createRelevantResponseJSON(transactions) {
    let relevantResponseJSON = [];
    for(let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        let temp = { 
                        transactionId: transaction.TransactionId,
                        information: transaction.TransactionInformation,
                        currency: transaction.Amount.Currency,
                        amount: roundTo5Rappen(transaction.Amount.Amount),
                        date: transaction.BookingDateTime,
                        status: transaction.Status,
                        sign: transaction.CreditDebitIndicator === 'Credit' ? "" : "-" //kinda ew 
                    }
        relevantResponseJSON.push(temp);
    }
    return relevantResponseJSON;
}

module.exports = transactionsRouter;