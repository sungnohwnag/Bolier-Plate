const express = require('express')
const app = express()
const port = 3000
const { User } = require("./Models/User");
const bodyParser = require('body-parser');
const config = require('./config/key');


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true//,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('Mongo DB connected'))
  .catch(err => console.log(err))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World! Nodemon')
})

app.get('/test', (req, res) => {
  res.send('Hello Test World!')
})

app.post('/register', (req, res) => {
  //회원가입 정보 Client에서 수신


  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success:true
    })

  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})