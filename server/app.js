const express = require('express');
const app = express();
const cors = require('cors')
const bp = require('body-parser')
const PORT = 9939
const path = require('path')
const pool = require('./db.js').pool

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'../client')))

        
// route
app.route('/api/db/write').post(async(req,res)=>{
    const {type,name,schema} = req.body
    console.log(req.body)
    let createDB = await pool.query(`create database ${name};`)
    console.log(createDB)
    res.send('db written')
})

app.listen(PORT,()=>{
    console.log('listeng on port ' + PORT)
})