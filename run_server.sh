#!/bin/bash

if [ -e ".env" ]; then
    export $(grep -v '^#' .env | xargs)
fi
pip install -r requirements.txt
npm install
npm run all