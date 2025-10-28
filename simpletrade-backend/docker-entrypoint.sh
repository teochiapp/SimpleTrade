#!/bin/sh
set -e

# Ensure database directory exists
mkdir -p ./database
mkdir -p ./.tmp
mkdir -p ./public/uploads

# Start the application
exec "$@"
