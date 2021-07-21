# Shellter website :turtle:

> A simple fullstack website for a fake nonprofit organization called 'Shellter'.

## Goals

- Integrate a payment gateway
- Connect to database for newsletter registration :heavy_check_mark:
- Create a functioning contact form :heavy_check_mark:
- Make design responsive :heavy_check_mark:

## Structure

- `/server.js` Entry point for the application, configures the server and static content
- `/views` EJS files for HTMl markups
- `/views/partials` EJS files for the same codes on several web pages
- `/routes` Router for web pages
- `/fixtures` JSON files for website contents
- `/public/images` Images for website
- `/public/styles` Sass & CSS files for global styling

## Run website locally

1. Install Node.js version 10+
2. Fork and clone repository
3. Install dependencies
``` bash
npm install
```
4. Run application
``` bash
node server
```

## Dependencies

| Project      | Home Page                                     |
|--------------|-----------------------------------------------|
| express      | <https://expressjs.com/>                      |
| ejs          | <https://ejs.co/>                             |
| morgan       | <https://github.com/expressjs/morgan#readme/> |
| googleapis   | <https://console.cloud.google.com/apis>       |
| nodemailer   | <https://nodemailer.com/about/>               |
