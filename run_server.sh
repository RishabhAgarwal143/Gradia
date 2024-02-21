#!/bin/bash
source ../.venv/Scripts/activate
export GENERATE_SOURCEMAP=false
pip install -r requirements.txt
npm install
npm run all