CREATED by [AHMET UZGOR](https://www.linkedin.com/in/ahmet-uzgor-a1397a134/)

This folder includes node.js restful api which is written for a company case study .
Used technologies are listed below:

Node.js => express, mongodb (mongoose) for database, jest + supertest for testing

To be able to start app please follow below codes; and please create ".env" file and add your MONGODB_URI 
```
git clone https://github.com/ahmet-uzgor/case-solution.git
cd case-colution
npm install
npm start
```
It will start on localhost:3000 or 127.0.0.1:3000.

ALSO you can test this app from this [site]()

Also to run test under __test__ folder. Run below code. 
```
npm run test
```
### Request Payload Structure

| Parameters | Description |
| ------ | ----------- |
| startDate   | Date (YYYY-MM-DD) |
| endDate | Date (YYYY-MM-DD) |
| minCount    | number |
| maxCount    | number |

```jsx
POST /filterRecords HTTP/1.1
Host: 
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

### Structure of Response Payload
```jsx
{
  "code":0,
  "msg":"Success",
  "records":[
    {
    "key":"TAKwGc6Jr4i8Z487",
    "createdAt":"2017-01-28T01:22:14.398Z",
    "totalCount":2800
    },
    {
    "key":"NAeQ8eX7e5TEg7oH",
    "createdAt":"2017-01-27T08:19:14.135Z",
    "totalCount":2900
    }
  ]
}
```

# Folder Structure
To create sustainable and understandable structure, I tried to collapse all related files under a folder also I have followed global rules for people who will try to understand codes.
- Endpoints are located under routes/ folder inside of their related js file.
- Db related files such as connection and queries are located under db/ file
- All process handler such as error-handler, validation etc... is located under handler folder.
- Mongodb models/schemas are located under models/ folder
- All other configuration related files are located under main project folder

# Error Handling
To handle all errors in a suitable way, I have implemented both validation rules and custom error middlewares.
Also suitable status codes are send with http response also response includes, error code and message.
Codes and Response Messages are listed below;
- Code => 0 , Success
- Code => -1, Bad_Request , Typo error in Request Body
- Code => -2, Given parameter is empty or not provided
- Code => -3, Given parameters are in wrong format
- Code => -4, DB error, connection or query error
- Code => -5, Internal Server Error
