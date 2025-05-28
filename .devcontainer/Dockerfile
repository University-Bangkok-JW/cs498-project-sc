# Use official Node.js 18 image
FROM node:18

# Install system dependencies, including git-lfs
RUN apt-get update && \
    apt-get install -y \
    git \
    git-lfs \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    apt-transport-https \
    software-properties-common

# Install Docker CLI
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Install Docker Compose (v2)
RUN curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Initialize Git LFS
RUN git lfs install --system

# Confirm installs
RUN node -v && npm -v && git --version && git lfs version && docker --version && docker-compose --version

# Set working directory
WORKDIR /workspace