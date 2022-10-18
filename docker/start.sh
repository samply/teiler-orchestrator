#!/usr/bin/env bash

envsubst  < index.html > temp.html
mv temp.html index.html
envsubst  < samply-root-config.js > temp-samply-root-config.js
mv temp-samply-root-config.js samply-root-config.js

echo 'Start Root Config in NGINX in foreground (non-daemon-mode)'
exec nginx -g 'daemon off;'
