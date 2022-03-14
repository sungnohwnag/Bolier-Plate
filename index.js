const express = require('express')
const app = express()
const port = 3000
const { User } = require("./Models/User");
const bodyParser = require('body-parser');
const config = require('./config/key');


const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true//,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('Mongo DB connected'))
  .catch(err => console.log(err))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

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
      success: true
    })

  });
})

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당되는 유저가 없습니다"
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })
      console.log(user);
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });

      })

    })

  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})