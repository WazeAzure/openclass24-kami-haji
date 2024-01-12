/* SERVER */
var express = require('express');
const cookieParser = require('cookie-parser');
var {firebaseApp, firebaseDB} = require('./fire');
var app = express();
const port = 3000;

var bodyParser = require('body-parser');
const { ref, onValue } = require('firebase/database');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());


app.get('/', function(req, res){
    res.render('index.html');
})

app.get('/home', function(req, res){
    let role = req.cookies.role;
    if(role == undefined){
        res.redirect('/');
    } else {
        let val = Buffer.from(role, 'base64').toString('ascii').trim();
        if(val == 'user'){
            res.render('home.ejs');
        } else if(val == 'admin'){
            res.render('admin.ejs');
        } else {
            res.redirect('/');
        }
    }
})

app.get('/api/flag', function(req, res){
    let role = req.cookies.role;
    if(role == undefined){
        return res.redirect('/');
    }

    let val = Buffer.from(role, 'base64').toString('ascii').trim();
    if(val != 'admin'){
        return res.redirect('/home');
    }

    // clean
    console.log(req.query.id);
    const dbUrl = "https://openclass24-firebase-a0ff7-default-rtdb.asia-southeast1.firebasedatabase.app";
    const dbRef = ref(firebaseDB, 'flag/' + req.query.id);
    onValue(dbRef, (snapshot) => {
        return res.send(snapshot.val());
    })
    
})

app.get('/setcookie', function(req, res){
    let minute = 60 * 1000;
    let cookie_val = Buffer.from('user').toString('base64');
    res.cookie('role', cookie_val, {maxAge: minute});
    res.redirect('/home');        
})

app.post('/api/signin', function(req, res){
    var temp = req.body;
    if(temp.username == 'user' && temp.password == 'user123'){
        res.redirect('/setcookie');
    } else {
        res.redirect('/');
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})