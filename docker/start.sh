#!/usr/bin/env bash

envsubst  < index.html > temp.html
mv temp.html index.html

echo 'Start Root Config in NGINX in foreground (non-daemon-mode)'
exec nginx -g 'daemon off;'
