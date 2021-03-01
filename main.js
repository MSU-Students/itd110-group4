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
    await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[0]);
        }
    })
    var scheduleDate = new Date('March 1, 2021 08:30:00');
    return await scheduleInterview(id, scheduleDate);
}

async function scheduleInterview(id, scheduleDate){
    await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[1]);
            console.log('Interview date on', scheduleDate);
        }
    })
    return await scheduleExam(id, scheduleDate);
}

async function scheduleExam(id, scheduleDate){
    var examDate = new Date(scheduleDate);
    examDate.setDate(examDate.getDate() + 10);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[2]);
            console.log('Exam date on', examDate);
        }
    })
}