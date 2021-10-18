const { format} = require('timeago.js');


// esta funcion tiene  que ser accedida por las vistas
const helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
};

module.exports = helpers;