#!/bin/bash

yarn -y
npm run load
npm run xmlreport
npm run report

exit 0 #Exit with success
