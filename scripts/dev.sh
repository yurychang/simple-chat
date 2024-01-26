#!/bin/bash

# Define cleanup procedure
cleanup() {
    echo "Container stopped, performing cleanup..."
    
    # Kill web dev process
    if [[ -n $web_pid ]]; then
        kill $web_pid
    fi

    # Kill chat-server dev process
    if [[ -n $chat_server_pid ]]; then
        kill $chat_server_pid
    fi

    docker compose down
}

# Trap the EXIT signal to perform cleanup
trap cleanup SIGINT SIGTERM

# Run docker compose
docker compose up -d

# Run web dev in the background and capture PID
pnpm web dev &
web_pid=$!

# Run chat-server dev in the background and capture PID
pnpm chat-server dev &
chat_server_pid=$!

wait
