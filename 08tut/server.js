const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


// custom middleware : a logger
/* app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method}\t${req.path}`);
    next();
}) */
app.use(logger)

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'https://yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3500', 'https://www.google.co.in', 'https://www.google.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


// built-in middleware to handle urlencoded data
// in other words : form data
// 'content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subdir',express.static(path.join(__dirname, '/public')))


// routes
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
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