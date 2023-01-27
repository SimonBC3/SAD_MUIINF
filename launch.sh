#Create docker network
docker network create internal
docker compose up -d
cd ./worker/
docker compose up -d
cd ../frontend/
docker compose up -d
