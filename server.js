const express = require('express')
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')
var ObjectID = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient 
const uri = process.env.DB

let db;

MongoClient.connect(uri, {useUnifiedTopology: true }, (err, client) => {
    if(err) return console.log(err)
    db = client.db('teste')
    app.listen(3000, ()=>{
        console.log('server na porta 3000')
    })
})

const app = express()

app.use(cors());
app.use(bodyparser.json())


app.get('/', (req, res) => {
    res.send('<h1>Hello Worl</h1>')
})

app.route('/data')
.get((req, res) =>{
    db.collection('data').find().toArray((err, result) =>{
        res.send(result)
    })
})
.post((req, res) => {
    db.collection('data').insertOne(req.body, (err, result) =>{
        if(err) return console.log(err)

        console.log('salvo no banco de dados')
        res.send('ok')
    })
})

app.route('/data/:preco')
.put((req, res) =>{
    var id = req.params.preco
    db.collection('data').updateOne({ "_id": ObjectID(id) }, {
        $set: {
            name: "modificado",
        }
    }, (err, result) =>{
        if(err) return res.send(err)
        res.send('atualizado')
    })
})
.delete((req, res) =>{
    var id = req.params.preco
    db.collection('data').deleteOne({ "_id": ObjectID(id) }, (err, result) =>{
        if(err) return res.send(err)
        res.send('deletado')
    })
})

app.post('/send', (req, res) =>{
    const {name, email, tel, message, to } = req.body
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: process.env.EMAIL, pass: process.env.EMAIL_PASS 
        }
    },)

    if(name == "" || email == "" || tel == ""){
        return res.status(500);
    }

    let html = ""
    if(message == ""){
        html = `<p><span style="font-weight: bold">Nome:</span> ${name}</p><p><span style="font-weight: bold">Email:</span> ${email}</p>
        <p><span style="font-weight: bold">Telefone:</span> ${tel}</p>`
    }
    else{
        html = `<p><span style="font-weight: bold">Nome:</span> ${name}</p><p><span style="font-weight: bold">Email:</span> ${email}</p>
        <p><span style="font-weight: bold">Telefone:</span> ${tel}</p><p><span style="font-weight: bold">Mensagem:</span> ${message}</p>`
    }

    transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        replyTo: email, //enviado como parametro,
        subject: 'Landing page Peugeot 208',
        html: html
    }).then(info=>{
        return res.status(200).send(info)
    }).catch(error=>{
        return res.status(500).send(error)
    })
})
