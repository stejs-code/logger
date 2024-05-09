#!/bin/bash

node -v
node server/entry.express.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
