const { format } = require('date-fns');
const { v4: uuid } = require('uuid'); // importing the version 4 of uuid as uuid (alias)

console.log(format(new Date(), 'yyy-MM-dd\tHH:mm:ss'));

console.log(uuid());