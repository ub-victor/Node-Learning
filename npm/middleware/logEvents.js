const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

// console.log(format(new Date(), 'yyyy-MM-dd\t H:mm:ss'));
// console.log(uuid());

const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

const logEvent = async (message, fileName)=> {
    const dataTime = `${format(new Date(), 'yyyy-MM-dd\t H:mm:ss')}`;
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // testing 
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), logItem)
    } catch(err){
        console.log(err);
    }
}

module.exports = logEvent;
