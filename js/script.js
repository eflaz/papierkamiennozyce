"use strict";
var papier = document.getElementById("box1");
var kamien = document.getElementById("box2");
var nozyce = document.getElementById("box3");
var output = document.getElementById("output");
var result = document.getElementById("result");
var newgame = document.getElementById("newgame");
var params = {progress: [], punktyGracza: 0, punktyKomputera: 0, rundy: 0, graSkonczona: false, rozegraneRundy: 0};

function showModal() {
    document.querySelector("#modal-overlay").classList.add("show");
    document.querySelector(".modal").classList.remove("show");
    document.querySelector("#modal-one").classList.add("show");
}

var hideModal = function(event) {
    event.preventDefault();
    document.querySelector("#modal-overlay").classList.remove("show");
  };

function wyswietlPunkty() {
  result.innerHTML =
    "Aktualny wynik:<br> Punkty Gracza: " +
    params.punktyGracza +
    "<br>Punkty Komputera: " +
    params.punktyKomputera +
    "<br><br>";
}
function losuj() {
  var mozliwosci = ["papier", "kamien", "nozyce"];
  var indeks = Math.floor(Math.random() * 3);
  return mozliwosci[indeks];
}

function wyswietlWynik(wynik, ruchKomputera, ruchGracza) {
  output.innerHTML =
    wynik +
    " komputer zagrał " +
    ruchKomputera +
    ", Ty zagrałeś " +
    ruchGracza +
    "<br><br>";
  wyswietlPunkty();
}
function wyswietlGuziki() {
  papier.style.visibility = "visible";
  kamien.style.visibility = "visible";
  nozyce.style.visibility = "visible";
}
function schowajGuziki() {
  papier.style.visibility = "hidden";
  kamien.style.visibility = "hidden";
  nozyce.style.visibility = "hidden";
}

function addListeners(){
  var elementList = document.querySelectorAll('.player-move');

  for (var i = 0; i < elementList.length; i++) {
      elementList[i].addEventListener("click", function() {
        playerMove(this.getAttribute("data-move"));
      });
  }

  document.querySelector("#modal-overlay").addEventListener("click", hideModal);

  var closeButtons = document.querySelectorAll(".modal .close");

  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", hideModal);
  }
}

function playerMove(ruchGracza) {
  if (params.graSkonczona) {
    wynik.innerHTML += "<br>Gra skończona! ";
  return;
  }

  var wynikRundy = '';
  var ruchKomputera = losuj();
  if (
    (ruchGracza == "papier" && ruchKomputera == "kamien") ||
    (ruchGracza == "kamien" && ruchKomputera == "nozyce") ||
    (ruchGracza == "nozyce" && ruchKomputera == "papier")
  ) {
    params.punktyGracza++;
  wynikRundy = 'Ty Wygrałeś!';
    wyswietlWynik(wynikRundy, ruchKomputera, ruchGracza);
  } else if (
    (ruchKomputera == "papier" && ruchGracza == "kamien") ||
    (ruchKomputera == "kamien" && ruchGracza == "nozyce") ||
    (ruchKomputera == "nozyce" && ruchGracza == "papier")
  ) {
    params.punktyKomputera++;
    wynikRundy = 'Komputer wygrał!';
    wyswietlWynik(wynikRundy, ruchKomputera, ruchGracza);
  } else {
    wynikRundy = 'REMIS!';
    wyswietlWynik(wynikRundy, ruchKomputera, ruchGracza);
  }
  params.rozegraneRundy++;
  var runda = {
    runda_punktyGracza: params.punktyGracza, 
    runda_punktyKomputera: params.punktyKomputera, 
    runda_rozegraneRundy: params.rozegraneRundy,
    runda_wynikRundy: wynikRundy
  };
  params.progress.push(runda);
  console.log(runda);
  sprawdzCzyKoniec();
}

function generujTabele(){
  var content = "<table border = 1><tr><td>Numer rundy</td><td>Wynik Rundy</td><td>Punktacja po rundzie</td></tr>";
    for(var i = 0; i < params.progress.length; i++){
      content += "<tr><td>"+ params.progress[i].runda_rozegraneRundy + "</td><td>" + params.progress[i].runda_wynikRundy + "</td><td>" + params.progress[i].runda_punktyGracza +" : "+ params.progress[i].runda_punktyKomputera + "<br></td></tr>";
    }
    return content;
}

function sprawdzCzyKoniec() {
  if (params.punktyGracza == params.rundy) {
    // wynik.innerHTML = "Wygrałeś całą grę!";
    document.getElementById("header-one").innerHTML = "Koniec gry";
    document.getElementById("content-one").innerHTML = "<p>Wygrałeś całą grę!</p>";
    
    document.getElementById("content-two").innerHTML = generujTabele(); 
    showModal();
    params.graSkonczona = true;
    schowajGuziki();
  } else if (params.punktyKomputera == params.rundy) {
    // wynik.innerHTML = "Komputer wygrał całą grę!";
    document.getElementById("header-one").innerHTML = "Koniec gry";
    document.getElementById("content-one").innerHTML = "<p>Komputer wygrał całą grę!</p>";
    document.getElementById("content-two").innerHTML = generujTabele();
    showModal();
    params.graSkonczona = true;
    schowajGuziki();
  }
}

wyswietlPunkty();
addListeners();



newgame.addEventListener("click", function() {
  params.rundy = window.prompt("Podaj liczbę rund");
  document.getElementById("wynik").innerHTML =
    "Do zwycięstwa potrzeba " + params.rundy + " punktów";
  params.graSkonczona = false;
  params.punktyGracza = 0;
  params.punktyKomputera = 0;
  params.rozegraneRundy = 0;
  params.progress = [];
  wyswietlPunkty();
  wyswietlGuziki();
});



