const express = require('express');
const app = express();
const cors = require('cors')
const bp = require('body-parser')
const PORT = 9939
const path = require('path')
const pool = require('./db.js').pool
const tempPool = require('./db.js').tempPool

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'../client')))

        
// route
app.route('/api/db/write').post(async(req,res)=>{
    const {type, name, schema} = req.body
    console.log(req.body)
    // create db
    let createDB = await pool.query(`create database ${name};`)
    console.log(createDB)
    // connect to db
    let connectDB = tempPool(name).connect((err,suc)=>{
        return err ? console.log(err) : console.log('you are connected to db: '+name)
    })
    console.log(connectDB)
    
    // create schema in db
    if(schema){
        let createSchema = await tempPool(name).query(`create schema ${schema};`)
        console.log(createSchema)
    }


    res.send('db written')
})

app.listen(PORT,()=>{
    console.log('listeng on port ' + PORT)
})