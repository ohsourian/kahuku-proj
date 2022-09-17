#!/bin/sh
echo 'container deploy'
sudo docker rm -f kahuku-front-app
sudo docker run -dp 8080:80 --name kahuku-front-app kahuku-front

