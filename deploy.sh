#!/bin/bash

# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Install PM2 globally
sudo npm install -g pm2

# Clone repository (replace with your repo URL)
git clone <your-repo-url>
cd api-testing

# Install dependencies
pnpm install

# Build the project
pnpm build

# Start the application with PM2
pm2 start dist/main.js --name "nest-api"

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
