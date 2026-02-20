#!/bin/bash
html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --minify-css true \
    --minify-js true \
    -o build/date-range-reporter/index.html date-range-reporter/index.html