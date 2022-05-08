const express = require('express');
const axios = require('axios');

const authRouter = express.Router();

const encodedRedirectUri = 'https%3A%2F%2F471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org%2Fredirect';
const clientId = 'r_1SOy46WbVz326O5QyvAWZ2gQK_ehZMpGFReeAYf2E=';
const clientSecret = 'J3zCTeJ6bWiv-oEWfHR5BFdCDoCITNN19mK3TKKjVcM=';
const authUsername = '123456789012@471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org';

authRouter.get('/', async (req, res) => {
    console.log("HELLO FROM AUTH API HANDLER");
    const appAccessToken = await getAccessToken();
    console.log(`Access Token: ${appAccessToken} \n`);
    const consentId = await submitAccuntAccessConsentAndRetrieveConsentId(appAccessToken);
    console.log(`Consent id: ${consentId} \n`);
    const authCode = await authorizeConsent(consentId);
    console.log(`Authorization Code: ${authCode} \n`);
    let userAccessToken = await exchangeAuthCodeForAccessToken(authCode); // store this in a session etc.
    console.log(`User Access Token: ${userAccessToken} \n`)
    res.json({token: userAccessToken});
});

function getAccessToken() {
    return axios //www-form-encoding is a must??!!
        .post('https://ob.sandbox.natwest.com/token', `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=accounts`)
        .then(response => {
            return response.data.access_token;
        })
        .catch(error => {
            throw error + " inside getAccessToken";
        });
}

function submitAccuntAccessConsentAndRetrieveConsentId(accessToken) {
    return axios
        .post('https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/account-access-consents', 
        {
            Data: {
              Permissions: [
                "ReadAccountsDetail",
                "ReadBalances",
                "ReadTransactionsCredits",
                "ReadTransactionsDebits",
                "ReadTransactionsDetail"
              ]
            },
            Risk: {}
          }, 
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => {
            return response.data.Data.ConsentId;
        })
        .catch(error => {
            throw error + " inside submitAccountAccessConsent";
        });
}

function authorizeConsent(consentId) {
    return axios
        .get(`https://api.sandbox.natwest.com/authorize?client_id=${clientId}&response_type=code id_token&scope=openid accounts&redirect_uri=${encodedRedirectUri}&state=ABC&request=${consentId}&authorization_mode=AUTO_POSTMAN&authorization_result=APPROVED&authorization_username=${authUsername}`)
        .then(response => {
            let jsonData = new URLSearchParams(response.data.redirectUri);
            return jsonData.values().next().value;
        })
        .catch(error => {
            throw error + " inside authorizeConsent";
        });
}

function exchangeAuthCodeForAccessToken(authCode) {
    return axios
        .post(`https://ob.sandbox.natwest.com/token`, `client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodedRedirectUri}&grant_type=authorization_code&code=${authCode}`)
        .then(response => {
            return response.data.access_token;
        })
        .catch(error => {
            throw error + " inside submitAccountAccessConsent";
        });
}

module.exports = authRouter;