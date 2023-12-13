# 1st Stage: Build project
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY docker/.env.template ./.env
#RUN rm -f ./.env
RUN npm run build


# 2nd Stage: Create nginx image with built project
FROM nginx:alpine

### Install bash
RUN apk update
RUN apk upgrade
RUN apk add bash

### Configuration of NGINX
COPY docker/nginx.conf /etc/nginx/nginx.conf


EXPOSE 9000
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .


ADD docker/start.sh                 /samply/
RUN chmod +x                        /samply/start.sh

CMD ["/samply/start.sh"]
