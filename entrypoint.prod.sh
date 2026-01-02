#!/bin/sh

set -e

echo "Running databse migraitons"
npm run migration:run:prod


echo "Starting the application..."
exec node dist/main