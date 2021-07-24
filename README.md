# Light The Night Website

## Requirements
```
docker
heroku cli
```

## Deployment
Ensure you are logged in heroku cli and heroku container
```
heroku login
heroku container:login
```
```
Frontend

heroku container:push web -a ia-ltn-challenge
heroku container:release web -a ia-ltn-challenge
```

```
Backend

heroku container:push web -a ia-ltn-challenge-api
heroku container:release web -a ia-ltn-challenge-api
```

## TODO
```
1) uncomment login menu and login slide
2) revisit instagram scraping mechanism
```