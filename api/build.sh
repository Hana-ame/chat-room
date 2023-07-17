#!/bin/bash

export GOOS=linux
export GOARCH=amd64
export CGO_ENABLED=1
# export CC=1
# export CC=aarch64-linux-gnu-gcc

go build 
go build -o chat-room.bin