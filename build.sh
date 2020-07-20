#!/bin/sh

printf "Start building\n"
npm install -g uglify-js
uglifyjs src/*.js --compress --mangle -o build/sheet2api-js.js
echo "Done."
