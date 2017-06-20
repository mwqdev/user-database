const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const userData = require('./data.js');

const app = express();

app.set('views', './views');
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

let userInfo = [];

console.log(userData.users.length);

for (let i in userData.users) {
    userInfo.push(userData.users[i]);
}

let listModel = {};
listModel.userInfo = userInfo;


let singleModel = {};

app.use('/public', express.static('./public'));

app.get('/', (req, res) => {
    res.render('userList', listModel);
});

app.get('/:userID', (req, res) => {
    let userID = req.params.userID;
    console.log(userID);
    let singleUser = [];
    singleUser.push(userInfo[userID - 1]);
    console.log(singleUser);

    singleModel.singleUser = singleUser;

    res.render('singleUser', singleModel);
});



app.listen(3000, () => {
    console.log('Server started');
});