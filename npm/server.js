const express = require('express'); 
const app = express();
const path = require('path');
const cors = require('cors'); // cross origin resource sharing
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross origin Resource sharing
app.use(cors(corsOptions)); // to allow cross-origin access it allows all origins by default


app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
// default path is /public
// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));



app.get(/\/*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));