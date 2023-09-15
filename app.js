const express = require('express')
const { getAllUsers } = require('./db/controllers.js');
const app = express();
const cors = require('cors');
app.use(express.json())

app.get('/api/users', getAllUsers)

app.use((req, res) => {
    res.status(404).send({msg: 'not found'})
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: 'does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23503") {
        res.status(400).send({msg: 'Invalid input'})
    } else if (err.code === "23502") {
        res.status(404).send({msg: 'does not exist in databse'})
    }
    else next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: 'server error getting API'})
})


module.exports = app;
