# Installasjon

## Lokal testing  
Sørg for å ha installert `npm` og `node.js` 
`git clone https://github.com/hlongdayle/scrumLords2017.git`  
`cd to/the/right/directory`  
`npm install`  
`npm test`  
`node/nodemon app.js` (nodemon kjører automatisk på endring i filstrukturen, mens node gjør ikke det)  
det skal nå komme log om at serveren kjører på en gitt port, mest sannsynlig 3000  

- controllers/ – defines your app routes and their logic
- helpers/ – code and functionality to be shared by different parts of the project
- middlewares/ – Express middlewares which process the incoming requests before handling them down to the routes
- models/ – represents data, implements business logic and handles storage
- public/ – contains all static files like images, styles and javascript
- views/ – provides templates which are rendered and served by your routes
- tests/ – tests everything which is in the other folders
- server.js – initializes the app and glues everything together
- package.json – remembers all packages that your app depends on and their versions
