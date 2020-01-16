const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();

//Body Parser Middleware
app.use(bodyParser.json());

//Serve static assets if we are in production
if (process.env.NODE_ENV === 'production') {
    //Set a static folder
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__driname,'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));