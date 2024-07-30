#!/bin/bash

# run at ./build.sh

source .env

npm run build
scp -r ./build/* $SERVER:$SREVER_PATH
