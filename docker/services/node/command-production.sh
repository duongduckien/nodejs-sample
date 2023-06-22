#!/usr/bin/env bash

yarn install && yarn build && cd dist && pm2-runtime start index.js