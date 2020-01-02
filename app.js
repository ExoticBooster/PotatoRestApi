//express importieren
const express = require('express')
// praktisch eine instanz erstellen
const app = express()
const morgan = require('morgan')

const eventRoutes = require('./api/routes/events')

//bevor die Anfrage per URL bearbeitet wird, wird die Anfrage über morgan im Terminal geloggt und dann einfach weiter gegeben.
app.use(morgan('dev'))

//setzt praktisch eine middleware auf
// alles was events in der URL enthält wird an die js datei eventRoutes weitergeleitet und dort verwaltet
app.use('/events', eventRoutes)


//alle Anfragen die durch die 'use' middleware durchgerutscht sind, also von keiner der IF abfragen angenommen werden,
//laufen bis hier hin und können abgefangen werden.
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

// die Middleware oben wurde geschrieben um einen Error bei einer Fehlerhaften URL zu schmeißen,
// diese Middelware hier soll alle Fehler abfangen und behandeln
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app

