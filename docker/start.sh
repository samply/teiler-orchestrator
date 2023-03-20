#!/usr/bin/env bash

envsubst < index.html > temp.html
mv temp.html index.html
envsubst < samply-root-config.js > temp-samply-root-config.js
mv temp-samply-root-config.js samply-root-config.js
envsubst '${TEILER_ROOT_CONFIG_SERVER_NAME}' < /etc/nginx/nginx.conf > /etc/nginx/nginx.temp.conf
mv /etc/nginx/nginx.temp.conf /etc/nginx/nginx.conf

echo 'Start Root Config in NGINX in foreground (non-daemon-mode)'
exec nginx -g 'daemon off;'
