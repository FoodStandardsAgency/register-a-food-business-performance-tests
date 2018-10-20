#!/bin/bash

yarn -y
npm run load
npm run xmlreport
npm run report

cp --force report.json /mnt/report.json
cp --force report.xml /mnt/report.xml
cp --force report.json.html /mnt/report.json.html

npm run sonarcloud

exit 0 #Exit with success
