const level = require('level');
const db = connectToDatabase('./studentdb');

function connectToDatabase(db){
    return level(db, { valueEncoding: 'json' });
}