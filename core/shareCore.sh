#!/bin/bash
#
### BEGIN INIT INFO
# Short-Description: Share the core content to the server and client components.
# Description:       The content in the core directory is meant for both components,
#                    web-server and client. Changes will be done here and then copied.
#                    States at the peers will be overwritten.
### END INIT INF


# Define the peer roots.
PATH_CLIENT=../client/src
PATH_SERVER=../server/src


# Check if the pwd is the expected one.
CURRENT_DIR_NAME="${PWD##*/}"
CORE_DIR_NAME=core

if [ $CURRENT_DIR_NAME != "core" ]; then
    echo Share the core is only possible from the root directory of the core.
    echo Please change into that directory and execute the script again.
    exit 1
fi


# Copy the core content to the peers.
# Use the recuirsive and the force option.

# Exclude the script itself. Add wildcards to exclude swap files also.
echo Share core with client...
rsync -Iav --exclude='shareCore.sh' --exclude='.shareCore.sh.swp' . $PATH_CLIENT

echo Share core with server...
rsync -Iav --exclude='shareCore.sh' --exclude='.shareCore.sh.swp' . $PATH_SERVER

