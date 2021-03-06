#!/usr/bin/env bash

# Build a container using the spec file provided

help_msg(){
    echo "Usage: $0 [specfile] [tag]"
    echo
    echo "$1"

    exit 1
}

cleanup(){
    echo "Exiting..."
    docker stop builder_kiba_instance && docker rm builder_kiba_instance
}

fetch_packages(){
    local port=$((5535 + $RANDOM % 60000))
    mkdir build
    # Start a kiba container
    docker run \
        -v "$PWD/build":'/kiba/packages' \
        --tmpfs /kiba/jobs \
        -dit \
        -p $port:2000 \
        --name builder_kiba_instance \
        ghcr.io/parzuko/kiba
    
    # Ensure the CLI is installed
    cd ../cli
    npm i
    cd -

    # Evalulate the specfile
    ../cli/index.js -u "http://127.0.0.1:$port" kpack spec $1   
}

build_container(){
    docker build -t $1 -f "$(dirname $0)/Dockerfile" "$PWD/build"
}


SPEC_FILE=$1
TAG=$2

[ -z "$SPEC_FILE" ] && help_msg "specfile is required"
[ -z "$TAG" ] && help_msg "tag is required"

[ -f "$SPEC_FILE" ] || help_msg "specfile does not exist"

which node || help_msg "nodejs is required"
which npm || help_msg "npm is required"

trap cleanup EXIT

fetch_packages $SPEC_FILE
build_container $TAG

echo "Start your custom kiba container with"
echo "$ docker run --tmpfs /kiba/jobs -dit -p 2000:2000 $TAG"