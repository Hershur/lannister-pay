# Lannister PAY
[![flutterwave logo](https://i0.wp.com/tech-ish.com/wp-content/uploads/2022/02/Flutterwave-new-logo_primary.jpg?fit=1600%2C889&ssl=1)](https://flutterwave.com)

Payment processing involves several components / services. One of such is determining the processing fee to charge per transaction. This API is an NGN (Nigerian Naira) fee processing service for a fictional Payment Processor (LannisterPay).

LannisterPay transaction fee processing service calculates the fee applicable to a transaction based on specific fee configurations.


## API Base URL
##### New URL -  [https://assurance-lannister-app.herokuapp.com/api/](https://assurance-lannister-app.herokuapp.com/api/)

Old URL -  [https://powerful-ocean-09223.herokuapp.com/api/](https://powerful-ocean-09223.herokuapp.com/api) (renamed to a more specific name)


## How to use

### Set up fee configuration
##### Fee setup endpoint -
##### _HTTP POST /fees_
[https://assurance-lannister-app.herokuapp.com/api/fees](https://assurance-lannister-app.herokuapp.com/api/fees)

##
##


Sample Data (body)
```
{
    "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
}   
```   

Sample Response 
```
HTTP 200 OK
{
  "status": "ok"
}
```

##

### Compute transaction fee
##### Fee computation endpoint - 
##### _HTTP POST /compute-transaction-fee_
[https://assurance-lannister-app.herokuapp.com/api/compute-transaction-fee](https://assurance-lannister-app.herokuapp.com/api/compute-transaction-fee)

##


Sample Data (body)
```
{
    "ID": 91203,
    "Amount": 5000,
    "Currency": "NGN",
    "CurrencyCountry": "NG",
    "Customer": {
        "ID": 2211232,
        "EmailAddress": "anonimized29900@anon.io",
        "FullName": "Abel Eden",
        "BearsFee": true
    },
    "PaymentEntity": {
        "ID": 2203454,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }
}  
```   

Sample Response 
```
HTTP 200 OK
{
    "AppliedFeeID": "LNPY0222",
    "AppliedFeeValue": 230,
    "ChargeAmount": 5230,
    "SettlementAmount": 5000
}
```

## How to run

- Install all dependencies - `npm install`
- Run `npm run start` or `npm run dev` (in development mode)
- Server starts running on [http://localhost:4000/api/](http://localhost:4000/api/)


