---
templateKey: blog-post
title: How to build a RESTful Node.js API server using JSON files
date: 2019-03-22T09:38:49.729Z
description: >-
  There are lots of articles on how to build a Node API server but they're
  either quite duff or very complex. None of them seem to deal with reading and
  writing to JSON files. Well let's change that by building our own Node API
  server using JSON data storage!
tags:
  - Development
  - JavaScript
  - Tutorials
---
Driven by a recent need to create a local API server to provide me some data-serving end points to a React app, I ran into a few huge walls.

Although there are a lot of articles out there detailing how to **create a Node API server** locally, some don't cover enough ground (especially from examples of how to use) or are overly complex. What's more, I wanted to serve and edit _real_ data from physical JSON files as a simple filestore database – this would save a lot of faff involving MongoDB or SQL Lite; both great, but overkill for this job.

For crying out loud, shouldn't it be easy to just make a Node API server that saves data to JSON files?!

After what felt like a decade of rummaging through complex documentation and hundreds of StackOverflow answers, I found a brilliant [article by Nic Raboy](\"https://www.thepolyglotdeveloper.com/2015/10/create-a-simple-restful-api-with-node-js/\") from as long ago as 2015! I think the article misses out a few of the necessary 'real world' end points such as POST that actually interact with a real datastore - in this case, JSON files.

But enough preamble, let's do this thing! Strap in, it's gonna be a long one!!

![](\"/content/images/2019/03/nodejs-new-pantone-black.png\")

Node JS logo

1\. Node API server setup
-------------------------

First things first, you'll need to make sure you have Node.js installed on your machine and preferably an up to date version of NPM.

OK? Good. So, let's create a new folder and navigate into it:

    mkdir ~/some/file/path/api-server\n

Drop into the folder and run NPM's `init` script to set up the project with some default files, such as `package.json`.

    cd ~/some/file/path/api-server\nnpm init

Now, we need to install a few things to get going, namely:

*   **Express** \> `npm install express`  
    _[Express](\"https://expressjs.com/\") is a web application framework that provides lots of awesome features and HTTP utility methods_
*   **Body Parser** > `npm install body-parser`  
    _[body-parser](\"https://www.npmjs.com/package/body-parser\") is a body parsing middleware that helps to process the body of requests sent to the express server_
*   **Nodemon** (optional) > `npm install nodemon --save-dev`  
    completely optional, but [Nodemon](\"https://nodemon.io/\") is super helpful because it acts as a file-watcher, reloading our server when we make changes to our files – handy!

Add a couple of folders and files so that your project structure looks something like this:

    /projectfolder\n--/data\n--/routes\n  --routes.js\nserver.js\npackage.json

Open up your `package.json` file and check that the `main` entry is set to our `server.js` file (our main entry point) as well as adding a 'start' script that will launch our Nodemon reloading magic.

    \"main\": \"server.js\",\n\"scripts\": {\n  \"start\": \"nodemon server.js\",\n}

### Install our packages

Setup's almost done, the last thing is to make sure that we've installed the packages and their dependencies so they're ready to rock. Run the following command:

    npm install

Bosh - setup's all done and we're ready to start building the server.

![\"blue](\"https://images.unsplash.com/photo-1543076563-8a29893e162d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ\")

Photo by [Nicole Baster](\"https://unsplash.com/@nicolebaster?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit\") / [Unsplash](\"https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit\")

2\. Building the server.js file
-------------------------------

Our first file, an entry point of sorts, will be `server.js`. We'll build up the main body of the API-serving logic here. We'll deal with our routes and route handling later on.

Open up `server.js` and add in the following code:

    // load up the express framework and body-parser helper\nconst express = require('express');\nconst bodyParser = require('body-parser');\n\n// create an instance of express to serve our end points\nconst app = express();\n\n// we'll load up node's built in file system helper library here\n// (we'll be using this later to serve our JSON files\nconst fs = require('fs');\n\n// configure our express instance with some body-parser settings \n// including handling JSON data\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: true }));\n\n// this is where we'll handle our various routes from\nconst routes = require('./routes/routes.js')(app, fs);\n\n// finally, launch our server on port 3001.\nconst server = app.listen(3001, () => {\n    console.log('listening on port %s...', server.address().port);\n});\n

\\n

There's a lot going on in there for a relatively small file. To unpack it a little, the top portion of the file essentially loads in our express and body-parser modules before creating instances of them and configuring some settings.

The next part is loading our routing file:

    const routes = require('./routes/routes.js')(app,fs);\n

\\n

This achieves a couple of things:

*   Loads in our main route-handling starter point `routes.js`
*   Passes our instance of express, `app` and the Node file system library, `fs` into the routes. We'll need both of these to a) attach our route-handling to our running server instance, and b) access our JSON files using Node's file system helpers

Now, we can't quite run our server. Since there's nothing defined in our routing file, it's very likely you'll get a `TypeError: require(...) is not a function` error. Not very helpful, but all will be resolved once we add some routes.

3\. Building the route handling system
--------------------------------------

So far, so good, but what good is an API server with no routes?! None, that's what. Let's remedy that and build out some route handling!

Open up `/routes/routes.js` and enter the empty module code as follows:

    const appRouter = (app, fs) => {\n\n};\n\nmodule.exports = appRouter;\n

\\n

Save the file and let's give this puppy a whirl. Enter this command in your terminal:

    npm start

You should see a glorious 'listening on port 3001' message. Splendid :)

![](\"/content/images/2019/03/api-started.png\")

Our beautiful API server start message

Now, let's get some more meaningful API-age going by adding our first route.

### Adding our first route

I should point out that at this stage we're going to be adding complete dummy (if not real-world-ish) data and example routes. Feel free to add anything you like as we go along or make the data and routes more relevant to you and your needs.

First, we need to add in some JSON data. Navigate to the `/data` folder and create a new `users.json` file. Fill it with something along these lines:

    {\n    "1": {\n        "name": "king arthur",\n        "password": "password1",\n        "profession": "king",\n        "id": 1\n    },\n    "2": {\n        "name": "rob kendal",\n        "password": "password3",\n        "profession": "code fiddler",\n        "id": 2\n    },\n    "3": {\n        "name": "teresa may",\n        "password": "password2",\n        "profession": "brexit destroyer",\n        "id": 6\n    }\n}\n

\\n

Next, create a new file under `/routes` called `users.js` and fill it with the following:

    const userRoutes = (app, fs) => {\n\n    // variables\n    const dataPath = './data/users.json';\n\n    // READ\n    app.get('/users', (req, res) => {\n        fs.readFile(dataPath, 'utf8', (err, data) => {\n            if (err) {\n                throw err;\n            }\n\n            res.send(JSON.parse(data));\n        });\n    });\n};\n\nmodule.exports = userRoutes;\n

\\n

Hurrah, our very first route is almost ready. Whilst not much to look at, notice that we're including our `users.json` data file path and then defining our first route `/users` which uses the GET request type. Now, when we run our server and run a GET request against the users path, we'll be served a list of our users in JSON format.

A couple of other points to mention here:

1.  We're using the ES6 formatting within our JavaScript files, including arrow function ([I have another article about arrow functions](\"/arrow-functions-in-javascript/\") right here).
2.  Within the body of the GET handler, we're calling the Node `fs` library we passed in to call the `readFile()` method. This helps us to access the underlying file system and load up a file

### Hook up our first route to the main route handler

Although complete, our first route won't do anything unless the main routing file, `routes.js` knows about it. So, open up the file and add the following to complete the wiring up:

    // load up our shiny new route for users\nconst userRoutes = require('./users');\n\nconst appRouter = (app, fs) => {\n\n    // we've added in a default route here that handles empty routes\n    // at the base API url\n    app.get('/', (req, res) => {\n        res.send('welcome to the development api-server');\n    });\n\n\n    // run our user route module here to complete the wire up\n    userRoutes(app, fs);\n};\n\n// this line is unchanged\nmodule.exports = appRouter;\n

\\n

4\. Testing our server
----------------------

So, we've setup our project, created a simple Node API server, added some data in JSON files to be served by the API, and created a route handler to serve API requests.

Let's test our hard work out. Run the same command as before to start the server:

    npm start

Once it's loading, you can visit `http://localhost:3001/users` in a browser, where you should be greeted by a list of users as defined in the JSON file.

![](\"/content/images/2019/03/api-server-userlist-resultes.png\")

JSON results from our GET request at /users

I checked this in FireFox, but it's worth downloading a dedicated API testing app for jobs like this. I'd recommend Postman (I use it myself locally and in development), but there are loads out there. It'll become more important later down the line when we need to pass data through with the request for POST or PUT requests.

You can [download Postman from their website](\"https://www.getpostman.com/downloads/\") for just about any environment and it's **free** for individual use.

Here's what our GET request looks like using Postman:

![](\"/content/images/2019/03/postman-get-users.png\")

/users GET request when using Postman desktop app

4a. Skip to the complete example
--------------------------------

GET-ting results and listing them is fine, but in the real-world we usually need to complete the rest of the RESTful CRUD cycle, namely creating (POST), updating (PUT), and deleting (DELETE).

Before we get to the more complex examples, you can skip ahead and [download the complete Node API server from the GitHub](\"https://github.com/bpk68/api-server-starter\") repository if you'd prefer.

[Checkout the complete Node API server with JSON file data on GitHub here](\"https://github.com/bpk68/api-server-starter\").

5\. Taking it further, completing the CRUD
------------------------------------------

Let's keep going while we're on a roll. In this section, we'll pad out our limited API server with some creating, updating and deleting methods to alter the JSON files stored on disk.

### Refactoring what we've got

As a huge fan of the [continuous refactoring technique](\"/continuous-refactoring-avoiding-technical-debt-in-the-here-and-now/\"), I'm always looking to improve code as I go. Looking at the file `users.js` now, we're going to start repeating a lot of code with the `fs.readFile()` and `fs.writeFile()` methods. Let's refactor them up to the top of the `users.js` file now:

    \nconst userRoutes = (app, fs) => {\n\n    //...unchanged ^^^\n\n    \n    // refactored helper methods\n    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {\n        fs.readFile(filePath, encoding, (err, data) => {\n            if (err) {\n                throw err;\n            }\n\n            callback(returnJson ? JSON.parse(data) : data);\n        });\n    };\n\n   const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {\n\n        fs.writeFile(filePath, fileData, encoding, (err) => {\n            if (err) {\n                throw err;\n            }\n\n            callback();\n        });\n    };\n\n    // READ\n    app.get('/users', (req, res) => {\n        fs.readFile(dataPath, 'utf8', (err, data) => {\n            if (err) {\n                throw err;\n            }\n\n            res.send(JSON.parse(data));\n        });\n    });\n};\n\nmodule.exports = userRoutes;\n

\\n

With the exception of the Read part of CRUD, all the other operations are going to involve reading data from a JSON file, altering it (adding, editing, removing) and then writing it back to the file.

This is going to involve virtually the same process for the reading and the writing parts, only the alteration part (the bit in the middle) is going to differ between requests.

So it makes sense to pull out the future redundant reading and writing to file operations and put them into separate abstract helper methods. That's what we've done.

Our new, refactored read/write methods look very similar. Here's what they do:

*   Both accept a callback argument that fires once the read/write operation is complete
*   They set some default, common variables (such as setting the path of the file to the default data file – in this case, `users.json`)
*   Internally, they catch and throw an error, or call the callback function once complete

You can [read more about the various file system methods on the Node website](\"https://nodejs.org/api/fs.html\").

### Creating a new user

We'll start with the create part of the CRUD, creating a new user. Add in the following code, just below our read method:

    // ...\n\n// CREATE\n    app.post('/users', (req, res) => {\n\n        readFile(data => {\n            const newUserId = Object.keys(data).length + 1;\n\n            // add the new user\n            data[newUserId] = JSON.parse(req.body.data);\n\n            writeFile(JSON.stringify(data, null, 2), () => {\n                res.status(200).send('new user added');\n            });\n        },\n            true);\n    });\n    \n// ...rest of file\n

\\n

It's quite a simple operation here. Note that we've changed the `app` function call to `app.post()` as this is a POST request to the API server. The route remains as `/users` but will hit this method when the request type is a POST.

First, we call our new read method and pass a callback function in. When the file is read and we get a JSON object, `data` back, we need to create a new `user` object. For this, we'll grab the number of objects in the file at the moment using `Object.keys(data)` and increment it by one.

Next, we add the new user, `JSON.parse(req.body.data)` to the users object using the new user ID we created – notice that we need to wrap it in `JSON.parse` to coerce the incoming request body into a format we can read and add to our current data.

Finally, we call our refactored `writeFile()` method, stringifying our new user data and passing it in. Once the file has been sucessfully written, we tell the response object to go back to the API caller with this line, `res.status(200).send('new user added')` – we also add a nice message to the caller to let them know it succeeded.

**Note,** in a more realistic setting, it's likely that you would return the updated user list, but for now, keeping things simple is easier so a little 'new user added' message is preferable.

### Updating and deleting users

The update and delete methods should look very familiar, as they are resemble the create method.

Here's our update function:

    // UPDATE\napp.put('/users/:id', (req, res) => {\n\n    readFile(data => {\n\n        // add the new user\n        const userId = req.params["id"];\n        data[userId] = JSON.parse(req.body.data);\n\n        writeFile(JSON.stringify(data, null, 2), () => {\n            res.status(200).send(`users id:${userId} updated`);\n        });\n    },\n        true);\n});\n

\\n

The main differences here are the route we call and grabbing the parameters out of the request.

*   The route has changed from `/users` to `/users/:id`. The `:id` portion is a variable parameter that we can append to our API URL. So, you could call `/users/4` which would match against this route if you used a PUT request – the accepted RESTful way of handling updates
*   We grab this `:id` value to help us find the correct user to edit using `req.params[\"id\"]`
*   Then we update the matching user from our users list by grabbing a JSON version of our request body – `JSON.parse(req.body.data)`

**Note,** we're not adding the extra complexity of validating the incoming data here. This is a **necessary part of production API development**, but for simplicities sake, we're trusting you to send the right data into the API request!

To round things off, here is our delete function:

    // DELETE\napp.delete('/users/:id', (req, res) => {\n\n    readFile(data => {\n\n        // add the new user\n        const userId = req.params["id"];\n        delete data[userId];\n\n        writeFile(JSON.stringify(data, null, 2), () => {\n            res.status(200).send(`users id:${userId} removed`);\n        });\n    },\n        true);\n});\n

\\n

Almost identical the the update route, the main difference here is that we use the JavaScript `delete` keyword to remove the matching user from the users list before saving back to the file.

### A fully functional Node API server using JSON files for data storage

So there you go. A fully functional API server for whatever you'd like to use it for. You can [visit the GitHub repository for the starter API server](\"https://github.com/bpk68/api-server-starter\") and download, checkout or fork to your heart's content.

If there's anything I've missed or that you'd like to know more about, let me know in the comments or shoot me an email to me\[at\]robkendal.co.uk.
