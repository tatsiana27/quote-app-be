#!/bin/bash

7z a -tzip shareQuoteLambda.zip d:\Trainings\Cloud\quote-app\src\app\notifications\handlers\shareQuote.js
aws lambda update-function-code --function-name shareQuote --zip-file fileb://shareQuoteLambda.zip --region us-west-2 --profile admin




