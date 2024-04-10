import express from "express";
import mysql from 'mysql2';
import bodyparser from 'body-parser';
import cors from 'cors';

const app= express()
let jsonparser=bodyparser.json();
app.use(express.json())
app.use(cors())
const db=mysql.createPool({
    host:'localhost',
    user: 'root',
    password : '',
    database: 'login',
}).promise();

app.get('/Filmek',async (req,res)=>{
    const [rows,fields]= await db.query('SELECT * FROM film')
    res.send(rows)
})
app.get('/Filmek',async (req,res)=>{
    const [rows,fields]= await db.query('SELECT * FROM sorozat')
    res.send(rows)
})

app.post('/newFilm',jsonparser, async (req,res)=>{
    try {
        const [rows,fields]= await db.query("SELECT * FROM film WHERE cim=?",[req.body.title])
    if(rows.length>0){
        res.status(200).json("Success")
    }else{
        res.status(201).json("Faile")
    }
    } catch (error) {
        res.status(500).send(error)
    }
    


})
app.post('/newSorozat',jsonparser, async (req,res)=>{
    try {
        const [rows,fields]= await db.query("SELECT * FROM sorozat WHERE cim=? AND reszek=?",[req.body.cim,req.body.reszek])
    if(rows.length>0){
        res.status(200).json("Success")
    }else{
        res.status(201).json("Faile")
    }
    } catch (error) {
        res.status(500).send(error)
    }
    


})





app.listen(3000);