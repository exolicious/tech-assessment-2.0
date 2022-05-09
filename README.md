# 🍎 Oepfelbaum Tech Assessment

Tech Assessment for Oepfelbaum - Digital Wallet by Egzon Demaj

![alt text](app_screenshot.jpg)

## How to run the application locally
1. :warning: Before anything else, make sure [Node](https://nodejs.org/en/) (+ npm) is installed
2. Clone repository
3. Open a terminal Inside the root directory and run `npm install`
4. Once npm install is finished you can run `npm run simple-dev`
5. The application should now be running at http://localhost:8080/


&nbsp;
## Technologies & Frameworks

### Frontend: Vue + Vuetify
![alt text](https://masteringjs.io/assets/images/vue/vue-spelled-out.jpg) + ![alt text](https://miro.medium.com/max/1200/1*x8__d6uxAWLLC3wu07asUQ.png)

### Backend: Node + Express
![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--KkScstnJ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zojuy79lo3fn3qdt7g6p.png)


&nbsp;
## Additional future Features & Refinements

- <b>Backend: </b>
  - Do not hand the actual Bearer Token to the client, rather introduce session management and save it in-memory (Redis)
  - Make proxy-API more dynamic regarding multiple banks (right now we assume only NatWest) -> add some kind of Middleware and/or further differentiate the proxy-API in /api/<b>BANKID</b>/ENDPOINT
  - ...

- <b>Frontend: </b>
  - Allow the user to choose a period of time, in which he wants to look at his transactions
  - Allow for more Banking-Use-Cases to be accessible by the user (depending on what the Bank-APIs offer)
  - Pagination
  - Introduce a State-Management library (store), especially as the Application gets more features

