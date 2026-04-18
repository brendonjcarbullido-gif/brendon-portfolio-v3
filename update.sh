#!/bin/bash
git pull origin main
docker compose down
docker compose up -d --build
echo "portfolio-v2 updated"
