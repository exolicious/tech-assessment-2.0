# 🍎 Oepfelbaum Tech Assessment

Tech Assessment for Oepfelbaum - Digital Wallet by Egzon Demaj

&nbsp;
## Technologies & Frameworks

### Vue.js
![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png?20170919082558)





&nbsp;
## Additional future Features & Refinements

* <b>Backend: </b>
  * Do not hand the actual Bearer Token to the client, rather introduce session management and save it in-memory (Redis)
  * Make proxy-API more dynamic regarding multiple banks (right now we assume only NatWest) -> add some kind of Middleware and/or further differentiate the proxy-API in /api/<b>BANKID</b>/ENDPOINT
  * ...

* <b>Frontend: </b>
  * Allow the user to choose a period of time, in which he wants to look at his transactions
  * Allow for more Banking-Use-Cases to be accessible by the user (depending on what the Bank-APIs offer)
  * Pagination
  * Introduce a State-Management library (store), especially as the Application gets more features

