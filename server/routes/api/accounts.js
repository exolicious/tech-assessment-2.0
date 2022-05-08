const express = require('express');
const axios = require('axios');
const httpsAgent = require('../../misc/httpsAgent');
const roundTo5Rappen = require('../../misc/roundTo5Rappen');

const accountsRouter = express.Router();

accountsRouter.post('/', async (req, res) => {
    try {
        const accounts = await getAccounts(req.body.token);
        console.log(`User Accounts: ${accounts} \n`);
        const accountBalances = await getAccountBalances(accounts, req.body.token);
        console.log(`Account Balances: ${accountBalances} \n`);
        const responseJson = createRelevantResponseJSON(accounts, accountBalances);
        res.json(responseJson);
    } catch(e) {
        console.error(`Error occured! Reason: ${e}`);
        throw e;
    }
});

function getAccounts(userAccessToken) {
    return axios
        .get('https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts', { agent: httpsAgent, headers: { Authorization: `Bearer ${userAccessToken}` }})
        .then(response => {
            console.log(response.data.Data.Account[0]);
            return response.data.Data.Account;
        })
        .catch(error => {
            throw error + " inside getAccounts";
        });
}

function getSingleAccountBalances(accountId, userAccessToken) {
    return axios
        .get(`https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts/${accountId}/balances`, { agent: httpsAgent, headers: { Authorization: `Bearer ${userAccessToken}` }})
        .then(response => {
            console.log(response.data.Data.Balance[0]);
            return response.data.Data.Balance[0]; //there are multiple entries for each accountid with the type being different, for this apps sake we just take the first entry which has type "expected"
        })
        .catch(error => {
            throw error + " inside getSingleAccountBalances";
        });
}

function getAccountBalances(accounts, userAccessToken) {
    try {
        let accountBalancesPromises = [];
        accounts.map(account => { accountBalancesPromises.push(getSingleAccountBalances(account.AccountId, userAccessToken))});
        return Promise.all(accountBalancesPromises);
    }
    catch (e) {
        throw error + " inside getSingleAccountBalances";
    };
}

function createRelevantResponseJSON(accounts, accountBalances) {
    let relevantResponseJSON = [];
    for(let i = 0; i < accounts.length && i < accountBalances.length; i++) {
        let account = accounts[i];
        let balance = accountBalances[i];
        let temp = { 
                        accountId: account.AccountId,
                        accountType: account.AccountType,
                        accountSubType: account.AccountSubType,
                        currency: account.Currency,
                        balance: roundTo5Rappen(balance.Amount.Amount),
                        valuta: balance.DateTime,
                        sign: balance.CreditDebitIndicator === 'Credit' ? "" : "-", //kinda ew 
                    }
        relevantResponseJSON.push(temp);
    }
    return relevantResponseJSON;
}

module.exports = accountsRouter;