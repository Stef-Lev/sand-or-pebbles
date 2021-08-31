#!/bin/bash

if [ "$1" == "b" ]; then
    cd backend/ && npm run server 
elif [ "$1" == "f" ]; then
    cd frontend/ && npm run start 
fi
# echo $1