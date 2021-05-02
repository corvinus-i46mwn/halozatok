var kérdések;
var kérdés = new Array()
var kérdéssorszám = 1
var correctAnswer = 0
var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1;   
var timeoutHandler;
window.onload = function () {
    //letöltés();
    init();
}

function letöltés() {
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
        );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    
    
    for (var i = 0; i < d.length; i++) {
        var k = { questionText: d[i].questionText, answer1: d[i].answer1, answer2: d[i].answer2, answer3: d[i].answer3, correctAnswer: d[i].correctAnswer, image:d[i].image} //Tömb kulcsokkal és értékekkel
        kérdés.push(k);
        }
    //document.getElementById("kérdés_szöveg").innerText = kérdés[1].questionText
    //document.getElementById("kép").innerHTML = "<img src='https://szoft1.comeback.hu/hajo/" + kérdés[1].image + "'>"
    kérdésMegjelenítés(kérdéssorszám);
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3   
    if (kérdés.image != "") {
        document.getElementById("kép").innerHTML = "<img src='https://szoft1.comeback.hu/hajo/" + kérdés.image + "'>"
    } else {
        document.getElementById("kép").innerText = ""
    }
    correctAnswer = kérdés.correctAnswer
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");

    document.getElementById(`válasz1`).style.pointerEvents = "auto"
    document.getElementById(`válasz2`).style.pointerEvents = "auto"
    document.getElementById(`válasz3`).style.pointerEvents = "auto"
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
    );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
    nextQuestion=nextQuestion+3
    fetch(`questions/count`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás kérdésszám-letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                numberOfQuestions=q
            }
        );
}

function next() {
    //document.getElementById("válasz1").style.backgroundColor = "transparent"
    //document.getElementById("válasz2").style.backgroundColor = "transparent"
    //document.getElementById("válasz3").style.backgroundColor = "transparent"
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function previous() {
    //document.getElementById("válasz1").style.backgroundColor = "transparent"
    //document.getElementById("válasz2").style.backgroundColor = "transparent"
    //document.getElementById("válasz3").style.backgroundColor = "transparent"
    clearTimeout(timeoutHandler)
    displayedQuestion--
    if (displayedQuestion < 0) {
        displayedQuestion = 0
        kérdésMegjelenítés()
    } else {
        kérdésMegjelenítés()
    }
}

function válasszínezés(n) {
    document.getElementById(`válasz1`).style.pointerEvents = "none"
    document.getElementById(`válasz2`).style.pointerEvents = "none"
    document.getElementById(`válasz3`).style.pointerEvents = "none"
    if (n == correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++
        if (hotList[displayedQuestion].goodAnswers==3) {
            if (nextQuestion>numberOfQuestions) {
                window.alert("Gratulálok, már nincs több betöltendő kérdés!");
                return;
            }
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++
        }
    } else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers=0
    }
    timeoutHandler = setTimeout(next, 3000);
}