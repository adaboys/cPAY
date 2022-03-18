# Report tools
#report engine lab to generate report from server side data to some format pdf, excel 
#tested generate thousands of pdf pages and excel rows with
#this code not cover the subject of creating data from db, this would be charge to mongo aggregation or sql query

#before run the app update app/.env file with following data
#REACT_APP_COTI_KEY= 
#REACT_APP_REQUEST_PAYMENT_URL=
#REACT_APP_GET_PAYMENT_URL=

#dev and tested with nodejs v15.0.1

#clone and run code: 
- git clone https:/github.com/adaboys/cPay
- yarn
- yarn app
- http://localhost:3001/