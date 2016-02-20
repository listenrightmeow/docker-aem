#! /bin/bash
WORKDIR=$(basename `pwd`)

docker-machine create -d virtualbox --virtualbox-memory 8192 "$WORKDIR"

vboxmanage sharedfolder add "$WORKDIR" --name "$WORKDIR" --hostpath `pwd` --transient