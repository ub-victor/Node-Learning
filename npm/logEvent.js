const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

// console.log(format(new Date(), 'yyyy-MM-dd\t H:mm:ss'));
// console.log(uuid());

const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

const logEvent = async (message)=> {
    const dataTime = `${format(new Date(), 'yyyy-MM-dd\t H:mm:ss')}`;
    const logItem = `${dataTime}\t${uuid()}\t${message}`
    console.log(logItem);
    try{
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    } catch(err){
        console.error(err);
    }
}

module.exports = logEvent;
