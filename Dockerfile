# Use a imagem oficial do Ubuntu como base
FROM ubuntu:latest

# Atualize os pacotes e instale as dependências necessárias
RUN apt-get update --fix-missing && \
  apt-get install -y curl vim nano git locales zip unzip && \
  rm -rf /var/lib/apt/lists/*

# Instale o Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install nodejs -y

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh && \
  echo "export LS_OPTIONS='--color=auto'" >>~/.bashrc && \
  echo "eval "\`dircolors\`"" >>~/.bashrc && \
  echo "alias ls='ls \$LS_OPTIONS'" >>~/.bashrc && \
  echo "alias ll='ls \$LS_OPTIONS -l'" >>~/.bashrc && \
  echo "alias l='ls \$LS_OPTIONS -lA'" >>~/.bashrc


# Instale o Yarn
RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarn-keyring.gpg && \
  echo "deb [signed-by=/usr/share/keyrings/yarn-keyring.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && \
  apt-get install -y yarn && \
  rm -rf /var/lib/apt/lists/*

# Instale o PM2 globalmente
RUN npm install -g pm2

WORKDIR /app

COPY backend/package.json /app/backend/package.json
RUN cd backend && npm install

WORKDIR /app

COPY backend /app/backend

# RUN cd backend && yarn prisma migrate dev

ENV SHELL=/bin/bash PYTHONIOENCODING=UTF-8 LANG=en_US.UTF-8

COPY . /app

COPY docker/bin/* /usr/bin/

COPY dkdata/backend/* /app/backend
COPY dkdata/frontend/* /app/frontend

WORKDIR /app

RUN cd frontend && yarn install
