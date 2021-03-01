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
    var examScore = Math.random() * (120 - 30) + 30;
    examScore = examScore.toFixed();
    await rateEntranceExam(id, examScore);
    await deleteStudent(id);
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
    student.Status = status[1];
    student.InterviewDate = scheduleDate;
    await db.put(id, student);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, value.Status);
        }
    })
}

async function scheduleExam(id, scheduleDate){
    var examDate = new Date(scheduleDate);
    var student = await db.get(id);
    student.Status = status[2];
    student.ExamDate = examDate;
    await db.put(id, student);
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, value.Status);
        }
    })
}

async function rateEntranceExam(id, examScore){
    var student = await db.get(id);
    student.Score = examScore;
    if(examScore >= 70){
        student.Status = status[3];
        await db.put(id, student);
    } else{
        student.Status = status[4];
        await db.put(id, student);
    }
    return await db.get(id, function(err, value){
        if(err){
            console.log(err);
        } else{
            console.log(value, value.Status);
        }
    })
}

async function deleteStudent(id){
    await db.del(id)
    return await db.get(id, function(err, value){
        if(err){
            console.log('Data is deleted');
        } else{
            console.log(value); 
        }
    })
}