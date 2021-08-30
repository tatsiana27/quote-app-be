#!/bin/bash

APP_DIR='D:/Trainings/Cloud/ngQuote-develop'
BUILD_DIR='/dist'

if [[ -d $APP_DIR ]]; then
     cd $APP_DIR

     if [[ -d ${APP_DIR}${BUILD_DIR} ]]; then
        echo "Build drectory exists"
        cd ${APP_DIR}${BUILD_DIR}
        echo "Enter zip file to find"
        read fileName

        if [[ -f $fileName ]]; then
          echo "Zip file exists"
          rm $fileName
        fi
     fi
     echo "Build started"
     npm run-script build
  else
     echo "$APP_DIR doesn't exist!!!"
fi

if [[ $? == 0 ]]; then
  cd ${APP_DIR}
  echo "Enter file name to compress"
  read fileName

  tar -cvf $fileName "dist"
  mv $fileName "${BUILD_DIR}"
fi


