# Microsevice Daily Trends 🌐

Microservice to web scraping to import feeds from Spain.

## Getting started

```bash

# Install dependencies
$ npm install

# Start docker database
$ docker-compose up -D 

# Start in develop mode
$ npm run dev

# Start in production mode
$ npm run build
$ npm run start

```
## API

```bash
# Create feed
POST /api/daily-feeds

# Delete feed
POST /api/daily-feeds

# Import feeds from extenal web pages
POST /api/daily-feeds/import

# Get daily feeds
GET /daily-feeds
```

