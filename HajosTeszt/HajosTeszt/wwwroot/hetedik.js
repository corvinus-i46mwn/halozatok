var kérdések;
var kérdés = new Array()
var kérdéssorszám=0
window.onload = function () {
    letöltés();
    
}

function letöltés() {
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
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

function kérdésMegjelenítés(kérdésszám) {
    document.getElementById("kérdés_szöveg").innerText = kérdés[kérdésszám].questionText
    document.getElementById("válasz1").innerText = kérdés[kérdésszám].answer1
    document.getElementById("válasz2").innerText = kérdés[kérdésszám].answer2
    document.getElementById("válasz3").innerText = kérdés[kérdésszám].answer3
    if (kérdés[kérdésszám].image!="") {
        document.getElementById("kép").innerHTML = "<img src='https://szoft1.comeback.hu/hajo/" + kérdés[kérdésszám].image + "'>"
    } else {
        document.getElementById("kép").innerText=""
    }
    
}

function next() {
    document.getElementById("válasz1").style.backgroundColor = "transparent"
    document.getElementById("válasz2").style.backgroundColor = "transparent"
    document.getElementById("válasz3").style.backgroundColor = "transparent"
    kérdéssorszám++
    if (kérdéssorszám>kérdés.length-1) {
        kérdéssorszám = 0
        kérdésMegjelenítés(kérdéssorszám);
    } else {
        kérdésMegjelenítés(kérdéssorszám);
    }
}

function previous() {
    document.getElementById("válasz1").style.backgroundColor = "transparent"
    document.getElementById("válasz2").style.backgroundColor = "transparent"
    document.getElementById("válasz3").style.backgroundColor = "transparent"
    kérdéssorszám--
    if (kérdéssorszám < 0) {
        kérdéssorszám = kérdés.length-1
        kérdésMegjelenítés(kérdéssorszám);
    } else {
        kérdésMegjelenítés(kérdéssorszám);
    }
}

function válasszínezés(n) {
    if (n==kérdés[kérdéssorszám].correctAnswer) {
        document.getElementById("válasz" + n).style.backgroundColor="green"
    } else {
        document.getElementById("válasz" + n).style.backgroundColor = "red"
        document.getElementById("válasz" + kérdés[kérdéssorszám].correctAnswer).style.backgroundColor = "green"
    }
}