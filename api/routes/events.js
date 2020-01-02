const express = require('express')
const router = express.Router();
const Pool = require('pg').Pool

//Connection Credentials
const pool = new Pool({
    user: 'Tomato',
    host: 'localhost',
    database: 'Tomato',
    password: 'Potato',
    port: '5432'
})


//hier kommen alle urls an die events enthalten.
router.get('/', (req, res, next) => {
    var resultMessage = null
    var events = null
    pool.query('SELECT * FROM "Sitzung"', (err, results) => {
        if(err){
            throw err
        }
        else{
            res.status(200).json({
                resultMessage,
                events
             })
        }
    })
})

router.post('/', (req, res, next) => {
    const event = {
        name: req.body.name,
        date: req.body.date,
        time: req.body.time
    }
    res.status(201).json({
        message: 'Handling POST requests to /events',
        createdEvent: event
    })
})

//hier kommt gleich express syntax
router.get('/:eventID', (req, res, next) => {
    const id = req.params.eventID
    if( id == 1){
        res.status(200).json({
            message: 'Der Urknall',
            id: id
        })
    } else{
        res.status(200).json({
            message: 'You passend an ID'
        })
    }
})

//Bereich zum ändern von Daten
router.patch('/:eventID', (req, res, next) => {
    const id = req.params.eventID
    res.status(200).json({
        message: 'Das Event mit der ID soll geändert werden',
        id: id
    })
})

//Bereich zum löschen von Daten
router.delete('/:eventID', (req, res, next) => {
    const id = req.params.eventID
    res.status(200).json({
        message: 'Das Event mit der ID soll gelöscht werden',
        id: id
    })
})

module.exports = router