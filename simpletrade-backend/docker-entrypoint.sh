#!/bin/sh
set -e

# Ensure database directory exists
mkdir -p ./database
mkdir -p ./.tmp
mkdir -p ./public/uploads

# Set permissions
chmod -R 755 ./database
chmod -R 755 ./.tmp
chmod -R 755 ./public/uploads

# Start the application
exec "$@"
