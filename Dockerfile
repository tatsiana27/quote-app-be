ARG BASE_IMAGES_ECR_REGISTRY="966298058302.dkr.ecr.us-east-1.amazonaws.com"
ARG BASE_IMAGES_REPOSITORY="base-images"
ARG BASE_NODE_IMAGE_TAG="node-14.17.4-alpine3.11"
FROM $BASE_IMAGES_ECR_REGISTRY/$BASE_IMAGES_REPOSITORY:$BASE_NODE_IMAGE_TAG

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm i nodemon -g

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

CMD ["npm", "run", "dev"]
