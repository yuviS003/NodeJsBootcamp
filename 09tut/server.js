const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions =  require('./config/corsOptions')
const { logger } = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


// custom middleware : a logger
app.use(logger)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html')); // 200 by default
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" })
    } else {
        res.type('text').send('404 Not Found');
    }
})

// Custom Error Handlers
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));