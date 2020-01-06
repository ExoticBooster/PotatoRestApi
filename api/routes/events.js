const express = require('express')
const router = express.Router();
const Pool = require('pg').Pool
 
//Connection Credentials
const pool = new Pool({
    user: 'tomato',
    host: 'localhost',
    database: 'Tomato',
    password: 'potato',
    port: '5432'
})

//hier kommen alle urls an die events enthalten.
router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM public."Sitzung" ORDER BY "Sitzungsnummer"', (error, results) => {
        if(error){
            //resultMessage = error
			throw error
        }
        else{
           res.status(200).json(results.rows)
           
        }
    })
})

//hier kommt gleich express syntax
router.get('/:eventID', (req, res, next) => {
    url = 'SELECT s."ID", "Sitzungsnummer", "Sitzungszeitpunkt", "Kommentar", b."Vorname" as "Protokollfuehrer" FROM public."Sitzung" as s INNER JOIN public."Benutzer" as b  ON s."Protokollfuehrer" = b."ID"  WHERE s."ID" = '+req.params.eventID
    pool.query(url, (error, results) => {
        if(error){
            //resultMessage = error
			throw error
        }
        else{
           res.status(200).json(results.rows)
           console.log(url)
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