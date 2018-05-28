"use strict";
var papier = document.getElementById("box1");
var kamien = document.getElementById("box2");
var nozyce = document.getElementById("box3");
var output = document.getElementById("output");
var result = document.getElementById("result");
var newgame = document.getElementById("newgame");
var punktyGracza = 0;
var punktyKomputera = 0;
var rundy = 0;
var graSkonczona = false;
function wyswietlPunkty() {
  result.innerHTML =
    "Aktualny wynik:<br> Punkty Gracza: " +
    punktyGracza +
    "<br>Punkty Komputera: " +
    punktyKomputera +
    "<br><br>";
}
function losuj() {
  var mozliwosci = ["papier", "kamien", "nozyce"];
  var indeks = Math.floor(Math.random() * 3);
  return mozliwosci[indeks];
}
// var wyswietlWynik = function(wynik, ruchKomputera, ruchGracza) {
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
// var playerMove = function(ruchGracza) {
function playerMove(ruchGracza) {
  if (graSkonczona) {
    wynik.innerHTML += "<br>Gra skończona! ";
    return;
  }

  var ruchKomputera = losuj();
  if (
    (ruchGracza == "papier" && ruchKomputera == "kamien") ||
    (ruchGracza == "kamien" && ruchKomputera == "nozyce") ||
    (ruchGracza == "nozyce" && ruchKomputera == "papier")
  ) {
    punktyGracza++;
    wyswietlWynik("Ty Wygrałeś! ", ruchKomputera, ruchGracza);
  } else if (
    (ruchKomputera == "papier" && ruchGracza == "kamien") ||
    (ruchKomputera == "kamien" && ruchGracza == "nozyce") ||
    (ruchKomputera == "nozyce" && ruchGracza == "papier")
  ) {
    punktyKomputera++;
    wyswietlWynik("Komputer wygrał! ", ruchKomputera, ruchGracza);
  } else {
    wyswietlWynik("REMIS", ruchKomputera, ruchGracza);
  }
  sprawdzCzyKoniec();
}
papier.addEventListener("click", function() {
  playerMove("papier");
});
kamien.addEventListener("click", function() {
  playerMove("kamien");
});
nozyce.addEventListener("click", function() {
  playerMove("nozyce");
});
function sprawdzCzyKoniec() {
  if (punktyGracza == rundy) {
    wynik.innerHTML = "Wygrałeś całą grę!";
    graSkonczona = true;
    schowajGuziki();
  } else if (punktyKomputera == rundy) {
    wynik.innerHTML = "Komputer wygrał całą grę!";
    graSkonczona = true;
    schowajGuziki();
  }
}
wyswietlPunkty();
newgame.addEventListener("click", function() {
  rundy = window.prompt("Podaj liczbę rund");
  document.getElementById("wynik").innerHTML =
    "Do zwycięstwa potrzeba " + rundy + " punktów";
  graSkonczona = false;
  punktyGracza = 0;
  punktyKomputera = 0;
  wyswietlPunkty();
  wyswietlGuziki();
});