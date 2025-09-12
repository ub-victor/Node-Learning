const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// ----------------- logEvent function -----------------
const logEvent = async (message, fileName) => {
    const dataTime = `${format(new Date(), 'yyyy-MM-dd\t H:mm:ss')}`;
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', 'logs', fileName),
            logItem
        )
    } catch (err) {
        console.log(err);
    }
};

// ----------------- logger middleware -----------------
const logger = (req, res, next) => {
    logEvent(
        `${req.method}\t${req.url}\t${req.headers.origin}`,
        'reqLog.txt'
    );
    console.log(`${req.method} ${req.path}`);
    next();
};

// ----------------- export both -----------------
module.exports = { logger, logEvent };
