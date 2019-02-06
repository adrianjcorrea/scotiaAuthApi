

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const database = {
 users: [
   {
     id: "",
     email: "adrianjcorrea007@gmail.com",
     firstname: "Jose",
     lastname: "Adrian",
     password: 'eva12',
     joined: new Date()
   },
   {
     id: '124',
     email: 'sally@gmail.com',
     firstname: 'Sally',
     lastname: 'colin',
     password: 'bananas',
     joined: new Date()
   }
 ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(database.users);
 })

 const token = jwt.sign({
  id: "5c41046fb685d90021453d60",
  email: "adrianjcorrea007@gmail.com",
  firstname: "Jose",
  lastname: "Adrian"

} , 'secretkey');

app.post('/logIn', (req, res) => {
  //This function compares the hashed password firs param the origional password and second the hash
  //bcrypt.compare("apples", "$2a$10$fcdTs2CtPrvw7zmBXA0SWuciTv9w/D4nfzkI2Ge.MDrspFbFU.azy", function(err, res) {
  //   console.log("first guess", res);
  //});
  //bcrypt.compare("veggies", "$2a$10$fcdTs2CtPrvw7zmBXA0SWuciTv9w/D4nfzkI2Ge.MDrspFbFU.azy", function(err, res) {
  //    console.log("second guess", res);
  //});  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDEwNDZmYjY4NWQ5MDAyMTQ1M2Q2MCIsImVtYWlsIjoiYWRyaWFuamNvcnJlYTAwN0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJKb3NlIiwibGFzdG5hbWUiOiJBZHJpYW4iLCJpYXQiOjE1NDc3NzU2MjQsImV4cCI6MTU0OTA3MTYyNH0.M8GR2QLItmuQTkiyAax6waafUVE0jqurAIRpSsLt-0s" ;

 if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password){
        bcrypt.hash(req.body.password , null, null, function(err, hash) {
          console.log('this is the hashed password',hash);
        });
          res.status(200).json({token});
        console.log(token);
   } else {
    res.status(400).json('error logging in');
  }
})

//if(req.body.email === database.users[0].email &&
//   req.body.password === database.users[0].password){
//    res.status(200).json('success');
//
//} else {
//res.status(400).json('error logging in');
//}

app.post('/register', (req, res) => {
const { email, firstname, lastname, password } = req.body;
//Hashing function so password will be hashed logs it to terminal.
bcrypt.hash(password , null, null, function(err, hash) {
  console.log(hash);
});
  database.users.push({
    id: '125',
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password
   })
 res.json(database.users[database.users.length - 1]);
})

function verifyToken (req, res, next){
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   next();
  }else{
    res.sendStatus(403);
  }
}

app.get('/accounts', verifyToken, (req, res) => {
jwt.verify(req.token, 'secretkey', (err, authData) =>{
  if(err){
    res.sendStatus(403);
  }else{
    res.json({
       response: [
         'hello',
         'Im ready',

       ],
       authData
     });
  }
 });
});

app.listen(8888, () =>{
   console.log('Example app listening on port 8888!');
 })
