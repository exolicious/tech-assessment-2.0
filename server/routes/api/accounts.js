const express = require('express');
const axios = require('axios');

const redirectUri = 'https://471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org/redirect';
const encodedRedirectUri = 'https%3A%2F%2F471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org%2Fredirect';
const clientId = 'r_1SOy46WbVz326O5QyvAWZ2gQK_ehZMpGFReeAYf2E=';
const clientSecret = 'J3zCTeJ6bWiv-oEWfHR5BFdCDoCITNN19mK3TKKjVcM=';
const authUsername = '123456789012@471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const appAccessToken = await getAccessToken();
        console.log(`Access Token: ${appAccessToken} \n`);
        const consentId = await submitAccuntAccessConsentAndRetrieveConsentId(appAccessToken);
        console.log(`Consent id: ${consentId} \n`);
        const authCode = await authorizeConsent(consentId);
        console.log(`Authorization Code: ${authCode} \n`);
        const userAccessToken = await exchangeAuthCodeForAccessToken(authCode); // store this in a session etc.
        console.log(`User Access Token: ${userAccessToken} \n`)
        await getAccountsInfo(userAccessToken);
    } catch(e) {
        console.error(`Error occured! Reason: ${e}`);
    }
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
            "Data": {
              "Permissions": [
                "ReadAccountsDetail",
                "ReadBalances",
                "ReadTransactionsCredits",
                "ReadTransactionsDebits",
                "ReadTransactionsDetail"
              ]
            },
            "Risk": {}
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
        .get(`https://api.sandbox.natwest.com/authorize?client_id=${clientId}&response_type=code id_token&scope=openid accounts&redirect_uri=${encodedRedirectUri}&request=${consentId}&authorization_mode=AUTO_POSTMAN&authorization_result=APPROVED&authorization_username=${authUsername}`)
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
            console.log(response.data);
            return response.data.access_token;
        })
        .catch(error => {
            throw error + " inside submitAccountAccessConsent";
        });
}

function getAccountsInfo(userAccessToken) {
    return axios
        .get('https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/accounts', {}, 
        {
            headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJkZW1vLWFwcC00NzE5NTliMS0zYTlmLTRhODgtODM3Ni1iNWM5M2JjNzVlNTkiLCJvcmciOiI0NzE5NTliMS0zYTlmLTRhODgtODM3Ni1iNWM5M2JjNzVlNTkuZXhhbXBsZS5vcmciLCJpc3MiOiJodHRwczovL2FwaS5zYW5kYm94Lm5hdHdlc3QuY29tIiwidG9rZW5fdHlwZSI6IkFDQ0VTU19UT0tFTiIsImV4dGVybmFsX2NsaWVudF9pZCI6InJfMVNPeTQ2V2JWejMyNk81UXl2QVdaMmdRS19laFpNcEdGUmVlQVlmMkU9IiwiY2xpZW50X2lkIjoiOTVjOWM3NjgtNzRmNi00Yzk5LWE3YmEtMTBhMTQxOTE1MzhhIiwibWF4X2FnZSI6ODY0MDAsImF1ZCI6Ijk1YzljNzY4LTc0ZjYtNGM5OS1hN2JhLTEwYTE0MTkxNTM4YSIsInVzZXJfaWQiOiIxMjM0NTY3ODkwMTJANDcxOTU5YjEtM2E5Zi00YTg4LTgzNzYtYjVjOTNiYzc1ZTU5LmV4YW1wbGUub3JnIiwiZ3JhbnRfaWQiOiJlYWRiMmRiOS1lOThjLTQ0OTMtOGQwOS0xMDdjMzRiNGQ3ZTkiLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImNvbnNlbnRfcmVmZXJlbmNlIjoiZmJhM2E1Y2YtZTNkNC00NmM0LWEwYjItYmExMzcwZmY3MTk3IiwiZXhwIjoxNjUxNzY3MDAzLCJpYXQiOjE2NTE3NjY3MDMsImp0aSI6ImEzN2MyMzJkLTY4YzAtNGYyZi1hNGNmLWMwOGJkNWQ5ZDMwMiIsInRlbmFudCI6Ik5hdFdlc3QifQ.xGprTXzasmJKTp47u1IdauReTzud7Gcyre1k2Bhyowc8c2g8FoWsgIVmVQWJOnRf80tYdBNRH8zSVciJz25s5RJVVD4yKYiehFJuSQtPJCnt491oDYpwOG3OpOrHPHEN1WZZgJAQWFmYRh1jYTATMIAw54fYQ7GeSl9yxQeIiUc719O1dF2IZHcb2DpJqoZmHuyxr30gZNS4oqJL1Z_sBCD1INGz-rd1QKetu2iJMV7zduiR2YRAYDNWwov_st--4L7MPRYL9n-c1U__G395j-CgLYeEQPKeBW2S7By_zFeOIreMTeVNU8HxlDcQV5MWFMGQ8yOiG8UDu_4I1yQKyg` }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            throw error + " inside getAccountsInfo";
        });
}

module.exports = router;