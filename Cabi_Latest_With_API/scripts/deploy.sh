#!/bin/bash

# Netlify Deployment Script for CAB-I-NET
# Usage: ./scripts/deploy.sh [--prod]

set -e

echo "🚀 Starting CAB-I-NET deployment..."

# Check if we're deploying to production
if [ "$1" = "--prod" ]; then
    echo "📦 Building for production..."
    npm run build:netlify
    
    echo "🌐 Deploying to production..."
    netlify deploy --prod --dir=dist/spa
else
    echo "🧪 Building for preview..."
    npm run build:netlify
    
    echo "🔍 Deploying preview..."
    netlify deploy --dir=dist/spa
fi

echo "✅ Deployment complete!"
echo "📊 Check your Netlify dashboard for deployment status." 