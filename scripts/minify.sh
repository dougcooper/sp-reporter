#!/bin/bash
set -e

./node_modules/.bin/html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --minify-css true \
    --minify-js true \
    -o build/date-range-reporter/index.html date-range-reporter/index.html

max_bytes=102400
html_bytes=$(wc -c < build/date-range-reporter/index.html)
if [ "$html_bytes" -gt "$max_bytes" ]; then
    echo "Error: built index.html is ${html_bytes} bytes; the limit is ${max_bytes} bytes" >&2
    exit 1
fi
