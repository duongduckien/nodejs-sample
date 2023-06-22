FROM node:14.14.0-alpine

RUN apk update && apk upgrade && apk add --no-cache \
	bash \
	curl \
	gettext && \
	npm install -g nodemon && \
	npm install -g pm2 && \
	npm rebuild bcrypt --build-from-source