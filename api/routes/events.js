const express = require('express')
const router = express.Router();

//hier kommen alle urls an die events enthalten.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /events'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /events'
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