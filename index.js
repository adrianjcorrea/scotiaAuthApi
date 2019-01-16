const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());
const database = {
 users: [
   {
     id: '123',
     name: 'John',
     email: 'john@gmail.com',
     password: 'cookies',
     entries: 0,
     joined: new Date()
   },
   {
     id: '124',
     name: 'Sally',
     email: 'sally@gmail.com',
     password: 'bananas',
     entries: 0,
     joined: new Date()
   }
 ]
}

app.get('/', (req, res) => {
   res.send(database.users);
 })

app.post('/signin', (req, res) => {
  bcrypt.compare("apples", "$2a$10$fcdTs2CtPrvw7zmBXA0SWuciTv9w/D4nfzkI2Ge.MDrspFbFU.azy", function(err, res) {
     console.log("first guess", res);
  });
  bcrypt.compare("veggies", "$2a$10$fcdTs2CtPrvw7zmBXA0SWuciTv9w/D4nfzkI2Ge.MDrspFbFU.azy", function(err, res) {
      console.log("second guess", res);
  });
  if(req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password){
       res.json('access');
  } else {
   res.status(400).json('error logging in');
 }
})

app.post('/register', (req, res) => {
const { email, name, password } = req.body;

  bcrypt.hash(password , null, null, function(err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
 res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
 database.users.forEach(user => {
   if (user.id === id) {
     found = true;
   return res.json(user);
   }
 })
 if (!found){
 res.status(400).json('no user');
 }
})

app.post('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
 database.users.forEach(user => {
   if (user.id === id) {
     found = true;
     user.entries++
     return res.json(user.entries);
   }
 })
 if (!found){
 res.status(400).json('no user');
 }
})

app.listen(8080, () =>{
   console.log('Example app listening on port 8080!');
 })

//var cors = require('cors');
//  var a = JSON.parse(req.body);
//    res.send('signed in');
//  if (a.username === database.users[0].email && a.password === database.secrets.hash) {
//    res.send('signed in');
//  }
//
//app.post('/findface', (req, res) => {
//  database.users.forEach(user => {
//    if (user.email === req.body.email) {
//      user.entries++
//      res.json(user)
//    }
//  });
//  res.json('nope')
//})
//
//
//  secrets: {
//    users_id: '123',
//    hash: 'wghhh'
//  }
//
//app.use(cors());
//
