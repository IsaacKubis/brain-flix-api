const express = require('express')
const app = express()
const port = 8080
const videos = require('./routes/videos')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
app.use('/static', express.static('public'))
app.use('/data', videos)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})