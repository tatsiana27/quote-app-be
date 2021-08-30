#!/usr/bin/env bash

cd ../

image="966298058302.dkr.ecr.us-east-1.amazonaws.com/back-end/quote-app"

docker pull $image:latest

echo "Which environment(dev, qa, prod)?"
read env

tag=$image:$env-latest

docker build -t $tag .

aws --region us-east-1 --profile admin ecr get-login-password | docker login --password-stdin -u AWS 966298058302.dkr.ecr.us-east-1.amazonaws.com
docker push $tag
