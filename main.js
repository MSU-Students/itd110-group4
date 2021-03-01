const level = require('level');
const db = connectToDatabase('./studentdb');

function connectToDatabase(db){
    return level(db, { valueEncoding: 'json' });
}

var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

(async function() {
    var id = await acceptStudent('201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City');
    var scheduleDate = new Date('March 1, 2021 08:30:00');
    await scheduleInterview(id, scheduleDate);
    var examDate = new Date('March 11, 2021 08:30:00');
    await scheduleExam(id, examDate);

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
    return id;
}

async function scheduleInterview(id, scheduleDate){
    var student = await db.get(id);
    student.InterviewDate = scheduleDate;
    await db.put(id, student);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[1]);
        }
    })
}

async function scheduleExam(id, scheduleDate){
    var examDate = new Date(scheduleDate);
    var student = await db.get(id);
    student.ExamDate = examDate;
    await db.put(id, student);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, status[2]);
        }
    })
}
