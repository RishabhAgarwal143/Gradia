#!/bin/bash


if [ "$1" != "-n" ]; then
    # If .env file exists, load environment variables from it and install dependencies
    pip install -r requirements.txt
    npm install
fi
if [ -e ".env" ]; then
        export $(grep -v '^#' .env | xargs)
fi
npm run all