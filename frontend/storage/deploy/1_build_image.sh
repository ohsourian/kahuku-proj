#!/bin/sh
echo 'building image'
sudo docker build -t kahuku-front -f storage/build/Dockerfile .
