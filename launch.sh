#!/bin/bash

NETWORK="internal"

if [ "$(docker network ls | grep "$NETWORK")" ]; then
    echo "Network $NETWORK already exists."
else
    docker network create $NETWORK
fi
docker compose up -d
cd ./database/
docker compose up -d
cd ..
cd ./worker/
docker compose up -d
cd ../frontend/
docker compose up -d
