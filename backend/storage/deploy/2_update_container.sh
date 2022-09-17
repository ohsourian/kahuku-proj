#!/bin/sh
echo 'container deploy'
sudo docker rm -f kahuku-server-app
sudo docker run -dp 3000:3000 --network host --name kahuku-server-app kahuku-server
