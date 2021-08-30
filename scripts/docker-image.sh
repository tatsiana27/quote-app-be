#!/usr/bin/env bash

cd ../

image="966298058302.dkr.ecr.us-east-1.amazonaws.com/back-end/quote-app"

#get timestamp for the tag
timestamp=$(date +%Y%m%d%H%M%S)

tag=$image:$timestamp
latest=$image:latest

docker build -t $tag .
docker tag $tag $latest

aws --region us-east-1 --profile admin ecr get-login-password | docker login --password-stdin -u AWS 966298058302.dkr.ecr.us-east-1.amazonaws.com
docker push $image
docker system prune -f
