var kérdések;
var kérdés = new Array()
var kérdéssorszám = 1
var correctAnswer = 0
window.onload = function () {
    letöltés();
    
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

function kérdésMegjelenítés(kérdés) {
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
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}  

function next() {
    //document.getElementById("válasz1").style.backgroundColor = "transparent"
    //document.getElementById("válasz2").style.backgroundColor = "transparent"
    //document.getElementById("válasz3").style.backgroundColor = "transparent"
    kérdéssorszám++
    kérdésBetöltés(kérdéssorszám)
}

function previous() {
    //document.getElementById("válasz1").style.backgroundColor = "transparent"
    //document.getElementById("válasz2").style.backgroundColor = "transparent"
    //document.getElementById("válasz3").style.backgroundColor = "transparent"
    kérdéssorszám--
    if (kérdéssorszám < 0) {
        kérdéssorszám = 1
        kérdésBetöltés(kérdéssorszám)
    } else {
        kérdésBetöltés(kérdéssorszám)
    }
}

function válasszínezés(n) {
    if (n==correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
    } else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + correctAnswer).classList.add("jó")
    }
}