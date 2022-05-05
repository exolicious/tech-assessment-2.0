
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log(accessToken);
        const consentId = await submitAccuntAccessConsentAndRetrieveConsentId(accessToken);
        console.log(consentId);
    } catch(e) {
        console.error(`Error occured! Reason: ${e}`);
    }
});

function getAccessToken() {
    return axios //www-form-encoding is a must??!!
        .post('https://ob.sandbox.natwest.com/token', 'grant_type=client_credentials&client_id=r_1SOy46WbVz326O5QyvAWZ2gQK_ehZMpGFReeAYf2E=&client_secret=J3zCTeJ6bWiv-oEWfHR5BFdCDoCITNN19mK3TKKjVcM=&scope=accounts')
        .then(response => {
            return response.data.access_token;
        })
        .catch(error => {
            throw error;
        });
}

function submitAccuntAccessConsentAndRetrieveConsentId(accessToken) {
    return axios
        .post('https://ob.sandbox.natwest.com/open-banking/v3.1/aisp/account-access-consents', {
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
            throw error;
        });
}

function authorizeConsent(consentId) {

}

module.exports = router;