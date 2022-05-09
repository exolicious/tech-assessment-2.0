const express = require('express');
const axios = require('axios');

const authRouter = express.Router();

const encodedRedirectUri = 'http%3A%2F%2Flocalhost%3A8080%2Fredirect';
const clientId = 'r_1SOy46WbVz326O5QyvAWZ2gQK_ehZMpGFReeAYf2E=';
const clientSecret = 'J3zCTeJ6bWiv-oEWfHR5BFdCDoCITNN19mK3TKKjVcM=';
var authUsername = '';

//https://api.sandbox.natwest.com/authorize?client_id=r_1SOy46WbVz326O5QyvAWZ2gQK_ehZMpGFReeAYf2E=&response_type=code id_token&scope=openid accounts&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&request=1c543ea9-d1ad-4ec4-9790-11c05f82b143&request=1c543ea9-d1ad-4ec4-9790-11c05f82b143 

authRouter.post('/',  (req, res) => {
    console.log(req.body.simulateProduction);
    authUsername = req.body.email;
    if(req.body.simulateProduction)
        prodAuthJourney(res);
    else
        testAuthJourney(res);
});

authRouter.post('/code',  async (req, res) => {
    console.log("HERROOO");
    const userAccessToken = await exchangeAuthCodeForAccessToken(req.body.code); // store this in a session etc.
    console.log(`User Access Token: ${userAccessToken} \n`)
    res.json({token: userAccessToken});
});

async function prodAuthJourney(res) {
    console.log("HELLO FROM PRODUCTION AUTH API HANDLER");
    const appAccessToken = await getAccessToken();
    console.log(`Access Token: ${appAccessToken} \n`);
    const consentId = await submitAccuntAccessConsentAndRetrieveConsentId(appAccessToken);
    console.log(consentId);
    res.send(`https://api.sandbox.natwest.com/authorize?client_id=${clientId}&response_type=code id_token&scope=openid accounts&redirect_uri=${encodedRedirectUri}&request=${consentId}`)
}

async function testAuthJourney(res) {
    console.log("HELLO FROM AUTH API HANDLER");
    const appAccessToken = await getAccessToken();
    console.log(`Access Token: ${appAccessToken} \n`);
    const consentId = await submitAccuntAccessConsentAndRetrieveConsentId(appAccessToken);
    console.log(`Consent id: ${consentId} \n`);
    const authCode = await authorizeConsent(consentId);
    console.log(`Authorization Code: ${authCode} \n`);
    const userAccessToken = await exchangeAuthCodeForAccessToken(authCode); // store this in a session etc.
    console.log(`User Access Token: ${userAccessToken} \n`)
    res.json({token: userAccessToken});
}

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
            console.log(response);
            let jsonData = new URLSearchParams(response.data.redirectUri);
            return jsonData.values().next().value;
        })
        .catch(error => {
            throw error + " inside authorizeConsent";
        });
}

function exchangeAuthCodeForAccessToken(authCode) {
    console.log("HARROOOOOOOOOOOOOOOOOOOO");
    console.log(authCode);
    return axios
        .post(`https://ob.sandbox.natwest.com/token`, `client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodedRedirectUri}&grant_type=authorization_code&code=${authCode}`)
        .then(response => {
            console.log(response.data.access_token);
            return response.data.access_token;
        })
        .catch(error => {
            throw error + " inside submitAccountAccessConsent";
        });
}

module.exports = authRouter;