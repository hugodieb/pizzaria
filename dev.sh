#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'
HOST_PROD=127.0.0.0

# Because nobody wants to be memorizing commands all the time
# Instructions:
# 1) ". dev.sh"
# 2) "devhelp"
# 3) Be happy

workon .pizzafun  # Change this to your project's name

export PROJ_BASE="$(dirname "${BASH_SOURCE[0]}")"
CD=$(pwd)
cd $PROJ_BASE
export PROJ_BASE=$(pwd)
cd $CD

#. ci/funcs.sh

function devhelp {
    echo -e "${GREEN}dkstop${RESTORE}            Stop and remove a ${RED}docker container${RESTORE} for this project"
    echo -e ""
    echo -e "${GREEN}dkstnginx${RESTORE}         Stop and remove a ${RED}docker container nginx${RESTORE} for this project"
    echo -e ""       
    echo -e "${GREEN}dkbuild${RESTORE}           Builds a ${RED}docker image${RESTORE} for this project"
    echo -e ""    
    echo -e "${GREEN}dkyarninstall${RESTORE}     Download node dependencies to ${RED}./node_modules/${RESTORE}"
    echo -e ""    
    echo -e "${GREEN}dknginxcompose${RESTORE}    Starts a nginx compose dockerized ${RED} for this project${RESTORE}"
    echo -e ""
    echo -e "${GREEN}dkrunApi${RESTORE}          Starts Api backend (dockerized) in dev mode."
    echo -e ""
    echo -e "${GREEN}dk <command>${RESTORE}      Runs ${RED}<command>${RESTORE} inside main container"
    echo -e "                  Example:"
    echo -e "                   dk ${RED}bash${RESTORE}"
  
}

function dkbuild {
    CD=$(pwd)
    cd $PROJ_BASE
    docker build -t pizzafun .
    exitcode=$?
    cd $CD
    return $exitcode
}


function dkstop {
    docker stop pizzafun
    docker rm pizzafun
    exitcode=$?
    cd $CD
    return $exitcode
}

function dkstnginx {
    docker stop pizzafun_nginx
    docker rm pizzafun_nginx
    exitcode=$?
    cd $CD
    return $exitcode
}

function dkyarninstall {
    CD=$(pwd)
    cd $PROJ_BASE
    docker run -it --rm -v $(pwd):/app -w /app/frontend -e NODE_ENV=development yarn install
    exitcode=$?
    cd $CD
    return $exitcode
}

function dknginxcompose {
    CD=$(pwd)
    cd $PROJ_BASE
    docker stop pizzafun_nginx
    docker rm pizzafun_nginx
    docker-compose -f docker/compose/nginx.yaml up -d
    exitcode=$?
    cd $CD
    return $exitcode
}

function dkrunApi {
    docker stop pizzafun
    docker rm pizzafun
    docker run --name pizzafun -it -d \
    -p 8000:8000 -p 3000:3000 \
    pizzafun start.sh
}

function dk {
    docker exec -it pizzafun $@
}


function echo_red {
    echo -e "\e[31m$1\e[0m";
}

function echo_green {
    echo -e "\e[32m$1\e[0m";
}

function echo_yellow {
    echo -e "${YELLOW}$1${RESTORE}";
}

echo_green "Welcome to reactMock's dev env"
echo_green "Hint: autocomplete works for the commands below ;)"
echo_red   "------------------------------------------------------------------------"
devhelp
