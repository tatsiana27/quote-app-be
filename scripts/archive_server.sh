#!/bin/bash

7z a -tzip d:\server.zip -x!d:\Trainings\Cloud\quote-app\node_modules -x!d:\Trainings\Cloud\quote-app\scripts -x!d:\Trainings\Cloud\quote-app\nginx_conf -x!d:\Trainings\Cloud\quote-app\.idea -x!d:\Trainings\Cloud\quote-app\.git -x!d:\Trainings\Cloud\quote-app\data  d:\Trainings\Cloud\quote-app\*
