import express from "express";
import mysql from 'mysql2';
import bodyparser from 'body-parser';
import cors from 'cors';

const app = express()
let jsonparser = bodyparser.json();
app.use(express.json())
app.use(cors())
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
}).promise();

app.get('/', async (req, res) => {
    const [rows, fields] = await db.query('SELECT * FROM `bejelentkezes`')
    res.send(rows)
})

app.post('/login',jsonparser, async (req,res)=>{
    try {
        const [rows,fields]= await db.query("SELECT * FROM `bejelentkezes` WHERE email=? OR username=?  AND password=?",[req.body.email,req.body.email,req.body.password])
    if(rows.length>0){
        res.status(200).send(rows)
    }else{
        res.status(201).json("Faile")
    }
    } catch (error) {
        res.status(500).send(error)
    }
    

})


app.post('/signup', jsonparser, async (req, res) => {
    try {
        let userdata = [req.body.email, req.body.username, req.body.password]
        const insert = await db.query('INSERT INTO bejelentkezes(ID,email,username,password) VALUES (?,?,?,?)', [null, userdata[0], userdata[1], userdata[2]]);
        res.status(201).send("Siker");
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Szerveroldali hiba');
    }
})

app.post('/valname', jsonparser, async (req, res) => {
    try {
        const [rows, fields] = await db.query("SELECT * FROM `bejelentkezes` WHERE email=? OR username=?", [req.body.email, req.body.username])
        res.status(200).send(rows)
        
    } catch (error) {
        res.status(500).send(error)
    }


})

app.post('/updateuser', jsonparser, async (req, res) => {
    try {
        let respond = await db.query("UPDATE `bejelentkezes` SET `email` =?, `username` = ?, `password` = ?, filmek=?,sorozat=? WHERE ID = ?;", [req.body.email, req.body.username, req.body.password, JSON.stringify(req.body.filmek), JSON.stringify(req.body.sorozat), req.body.ID,])
        if (respond.ok) {
            res.status(200).json("Success")
        } else {
            res.status(201).json("Faile")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }


})

app.get('/currentuser', async (req, res) => {
    const [rows, fields] = await db.query("SELECT `ID`,`email`,`username`,`password`,`filmek`,`sorozat` FROM `currentuser` WHERE firstID=1")
    try {

        rows[0].filmek = JSON.parse(JSON.parse(rows[0].filmek))
    }
    catch {
        rows[0].filmek = JSON.parse(rows[0].filmek)
    }
    try {

        rows[0].sorozat = JSON.parse(JSON.parse(rows[0].sorozat))
    }
    catch {
        rows[0].sorozat = JSON.parse(rows[0].sorozat)
    }

    res.send(rows[0])
})

app.post('/currentuser', jsonparser, async (req, res) => {
    try {
        let respond = await db.query("UPDATE `currentuser` SET `ID` = ?, `email` =?, `username` = ?, `password` = ?, filmek=?,sorozat=? WHERE firstID = 1;", [req.body.ID, req.body.email, req.body.username, req.body.password, JSON.stringify(req.body.filmek), JSON.stringify(req.body.sorozat)])

        if (respond.ok) {
            res.status(200).json("Success")
        } else {
            res.status(201).json("Faile")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }



})

app.post('/currentusersorozat', jsonparser, async (req, res) => {
    try {
        let respond = await db.query("UPDATE `currentuser` SET sorozat=? WHERE firstID = 1;", [JSON.stringify(req.body.sorozat)])

        if (respond.ok) {
            res.status(200).json("Success")
        } else {
            res.status(201).json("Faile")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }



})
app.post('/currentuserfilm', jsonparser, async (req, res) => {
    try {
        let respond = await db.query("UPDATE `currentuser` SET filmek=? WHERE firstID = 1;", [JSON.stringify(req.body.filmek)])

        if (respond.ok) {
            res.status(200).json("Success")
        } else {
            res.status(201).json("Faile")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }



})


app.listen(3000);

