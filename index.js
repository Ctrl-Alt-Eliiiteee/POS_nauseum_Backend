const express = require('express');

const firebaseConfig = require('./config/firebase');

const app = express();


var port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded());

app.use('/',require('./router/index'));

app.listen(port , function(err){
    if(err){
        return console.log('Error While launching');
    }
    else{
        return console.log('Server Up and Running');
    }
})