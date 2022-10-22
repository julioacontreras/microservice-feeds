# Microsevice Daily Trends 🌐

Microservice to web scraping to import feeds from Spain.

## Getting started

* Install depedencies
* First need create file `.env`, have a example `.env-example`
* Start database
* Start application

```bash

# Install dependencies
$ npm install

# Start docker database
$ docker-compose up

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

## body
{
    "createdAt": "2022-10-22T06:04:24.649+00:00",
    "channel": {
        "title": "blah",
        "slug": "blah",
        "link": "http://www.google.com"
    },
    "feeds": []
}

# Delete feed
POST /api/daily-feeds/:id

# Import feeds from extenal web pages
POST /api/daily-feeds/import

# Get daily feeds
GET /api/daily-feeds?max=5
```

