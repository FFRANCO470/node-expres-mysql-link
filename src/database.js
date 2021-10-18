const mysql = require('mysql');
const { database } = require('./keys');

// mysql no soporta promesas ni async await convertir callback a promesas
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        // perdio coneccion con la bd
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }

        // cuantas conecciones hay con la bd
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }

        // coneccion a base de datos rechazada
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    // si todo esta bien empezar conexion
    if(connection) connection.release();

    console.log('DB is Connected');

    return;
});

// usar async y promesas con base de datos
pool.query = promisify(pool.query);

module.exports = pool;