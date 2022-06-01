const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/stumanager', (err) => {
    if (err) {
        console.log('mongodb is not ok~')
        throw err
    } else {
        console.log('mongodb is ok~')
    }
})

let stuSchema = new mongoose.Schema({
    no: String,
    name: String,
    sex: String,
    year: String,
    class: Number
})

let stuModel = mongoose.model("student", stuSchema)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)

app.use(express.static(__dirname + '/views'))


app.get('/', (req, res) => {
    res.render('index.html')
})


app.get('/getStuInfo', (req, res) => {
    stuModel.find({}).exec((err, data) => {
        if (err) {
            res.send('erron')
        } else {
            res.send({data})
        }
    })
})

app.get('/addStu', async (req, res) => {
    let stus = new stuModel()
    stus.no = req.query.no
    stus.name = req.query.name
    stus.sex = req.query.sex
    stus.year = req.query.year
    stus.class = req.query.class
    console.log(stus.no, stus.name, stus.sex, stus.year, stus.class)
    stus.save((err) => {
        if (err) {
            res.send('erron')
        } else {
            res.send({ message: 'succers' })
        }
    })
})

app.get('/editStu', (req, res) => {
    stuModel.update({ no: req.query.Sno }, {
        $set: {
            name: req.query.sname,
            sex: req.query.ssex,
            year: req.query.syear,
            class: req.query.sclass
        }
    }, (err, result) => {
        if (err) {
            res.send('erron')
        } else {
            res.send({ message: 'succers' })
        }
    })
})

app.get('/delStu', (req, res) => {
    stuModel.remove({ no: req.query.no }, (err) => {
        if (err) {
            res.send('erron')
        } else {
            res.send({ message: 'succers' })
        }
    })
})



app.listen(3000, () => {
    console.log('server is running~')
})