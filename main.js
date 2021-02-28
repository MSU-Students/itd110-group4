const level = require('level');
const db = connectToDatabase('./studentdb');

function connectToDatabase(db){
    return level(db, { valueEncoding: 'json' });
}

var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

(async function() {
    await acceptStudent('201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City');
}());

async function acceptStudent(id, fullName, age, address){
    let attributes = { ID:id, Name: fullName, Age: age, Address: address };
    await db.put(id, attributes);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[0]);
        }
    })
}
