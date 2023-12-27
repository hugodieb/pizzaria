#!/bin/bash

# Iniciar o backend
echo "Iniciando o servidor backend..."
cd /app/backend
yarn migrate
yarn dev &

# Aguardar alguns segundos para garantir que o backend tenha iniciado antes de iniciar o frontend
sleep 5

# Iniciar o frontend
echo "Iniciando o servidor frontend..."
cd /app/frontend
yarn dev
