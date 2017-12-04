# CMPE_130_Project
Algorithm Project for CMPE 130 class

Steps to open the website:
1. Download MongoDB community server and configure it
https://www.mongodb.com/download-center#community (Download)
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ (Configure the MongoDB)
2.Open the MongoDB from cmd by typing C:\Program Files\MongoDB\Server\3.4\bin>mongod (this is the location where your mongodb is usually installed)
3. Use the terminal (Apple)/ CMD (Windows) to locate the folder Flight_Search
ex: C:\Users\manxi\Desktop\CMPE_130\Flight-Search-Web-Application\Flight_Search>
4. Type nodemon index.js in the terminal
ex: C:\Users\manxi\Desktop\CMPE_130\Flight-Search-Web-Application\Flight_Search>nodemon index.js


and the console will output a message
[nodemon] 1.12.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
body-parser deprecated undefined extended: provide extended option index.js:25:17
Listening on 8000



5. Open the browser, type http://localhost:8000/
6. The website should opened and ready to test
