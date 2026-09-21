#!/bin/bash
set -e

# Inline translations.js into the HTML first: SP loads plugin index.html via
# iframe srcdoc, so external <script src="..."> companions never load.
node scripts/inline-translations.cjs

./node_modules/.bin/html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --minify-css true \
    --minify-js true \
    -o build/date-range-reporter/index.html build/date-range-reporter/index.html.raw

rm -f build/date-range-reporter/index.html.raw

max_bytes=102400
html_bytes=$(wc -c < build/date-range-reporter/index.html)
echo "Built index.html: ${html_bytes} bytes (limit ${max_bytes})"
html_bytes=$(wc -c < build/date-range-reporter/index.html)
if [ "$html_bytes" -gt "$max_bytes" ]; then
    echo "Error: built index.html is ${html_bytes} bytes; the limit is ${max_bytes} bytes" >&2
    exit 1
fi
