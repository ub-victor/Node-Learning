const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyy-MM-dd\t H:mm:ss'));
console.log(uuid());