#!/bin/sh
echo 'building image'
sudo docker build -t kahuku-server -f storage/build/Dockerfile .
