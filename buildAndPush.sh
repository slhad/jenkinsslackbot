#!/bin/bash
rm -Rf node_modules
find . -type f -name '*.js' -exec rm {} +
docker build -t slhad/jenkinsslackbot:latest .
if [ "$1" = "push" ];then
    docker push slhad/jenkinsslackbot:latest
fi
npm install
./node_modules/typescript/bin/tsc