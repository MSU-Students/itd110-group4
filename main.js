var level = require('level');
var db = level('./leveldb');

var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

acceptStudent('201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City');

function acceptStudent(id, fullName, age, address){
    db.put(id, [id, fullName, age, address], function(err){
        //At this point 201812485 = ['201812485', 'Abdul Moiz Solaiman', 22, 'Marawi City']
    })
    db.get(id, function(err, value){
        console.log(value, status[0]); 
    })
    scheduleInterview(id, 'February 26, 2021');
}

async function scheduleInterview(id, scheduleDate){
    await db.get(id, function(err, value){
        console.log(value, status[1]);
        console.log('Interview date on ' + scheduleDate);
    })
    scheduleExam(id, scheduleDate);
}

async function scheduleExam(id, scheduleDate){
    await db.get(id, function(err, value){
        var examDate = 'March 1, 2021';
        console.log(value, status[2]);
        console.log('Exam date on ' + examDate);
    })
    rateEntranceExam(id, status);
}

async function rateEntranceExam(id, status){
    var examScore = Math.random() * (120 - 40) + 40;
    examScore = examScore.toFixed();
    await db.get(id, function(err, value){
        if(examScore >= 70){
            console.log('Exam score is ' + examScore);
            console.log(value, status[3]);
        } else{
            console.log('Exam score is ' + examScore);
            console.log(value, status[4]);
        }
    })
}