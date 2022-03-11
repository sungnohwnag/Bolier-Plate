const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://test:test@sungno.p3anp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true//,useCreateIndex:true,useFindAndModify:false
}).then(()=> console.log('Mongo DB connected'))
.catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Hello Test World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})