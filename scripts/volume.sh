#! /bin/bash
WORKDIR=$(basename `pwd`)

eval $(docker-machine env "$WORKDIR")

ssh docker@$(docker-machine ip "$WORKDIR") sudo mkdir -p "/$WORKDIR"
ssh docker@$(docker-machine ip "$WORKDIR") sudo mount -t vboxsf -o uid=1000,gid=50 $WORKDIR "/$WORKDIR"