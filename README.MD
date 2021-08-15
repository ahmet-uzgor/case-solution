CREATED by [AHMET UZGOR](https://www.linkedin.com/in/ahmet-uzgor-a1397a134/)

This folder includes node.js restful api which is written for a company case study .
Used technologies are listed below:

Node.js => express, mongodb (mongoose) for database, jest + supertest for testing

To be able to start app please follow below codes; and please create    .env file and add your MONGODB_URI 
```
git clone https://github.com/ahmet-uzgor/case-solution.git
cd case-colution
npm install
npm start
```
It will start on localhost:3000 or 127.0.0.1:3000.

ALSO you can test this app from this [site](https://obscure-fortress-36622.herokuapp.com/)

Also to run test under __test__ folder. Run below code. 
```
npm run test
```

# Folder Structure
To create sustainable and understandable structure, I tried to collapse all related files under a folder also I have followed global rules for people who will try to understand codes.
- Endpoints are located under routes/ folder inside of their related js file.
- Db related files such as connection and queries are located under db/ file
- All process handler such as error-handler, validation etc... is located under handler folder.
- Mongodb models/schemas are located under models/ folder
- All other configuration related files are located under main project folder 
