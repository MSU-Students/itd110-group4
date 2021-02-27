const level = require('level');
const db = connectToDatabase('./studentdb');

function connectToDatabase(db){
    return level(db, { valueEncoding: 'json' });
}

var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

acceptStudent('201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City');

function acceptStudent(id, fullName, age, address){
    let attributes = { ID:id, Name: fullName, Age: age, Address: address };
    db.put(id, attributes, function(err){
        //At this point 201812485 = ['201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City']
    })
    db.get(id, function(err, value){
        console.log(value, status[0]);
    })
}