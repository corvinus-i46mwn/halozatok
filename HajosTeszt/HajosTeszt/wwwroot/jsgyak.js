window.onload = function () {


    let hova = document.getElementById("elso")
    hova.innerHTML = ""
    for (var s = 0; s < 10; s++) {

        let sor = document.createElement("div");
        sor.classList.add("egymás_mellé")
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {

            let szám = document.createElement("button");
            sor.appendChild(szám);
            szám.innerText = (s + 1) * (o + 1)
            szám.classList.add("doboz")
            szám.style.color = `rgb(${255 / 10 * s},0,${255 / 10 * o})`

        }
    }


    let hova2 = document.getElementById("masodik")
    hova2.innerHTML = ""
    for (var s = 0; s < 10; s++) {

        let sor = document.createElement("div");
        sor.classList.add("egymás_mellé")
        hova2.appendChild(sor);

        for (var o = 0; o < s+1; o++) {

            let szám = document.createElement("div");
            sor.appendChild(szám);
            szám.classList.add("doboz")
            szám.innerText=faktoriálisR(s)/faktoriálisR(o)/faktoriálisR(s-o)

        }
    }
}

var faktoriálisR = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1)
    }
}