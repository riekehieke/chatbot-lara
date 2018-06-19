function regCode() {
  var regCode = document.getElementById("reg-code").value;
  if (regCode === "321") {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  }
}


document.addEventListener('init', function (event) {
  var page = event.target;


  if (page.id === 'start') {
    page.querySelector('#unwohl-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/unwohl.html', { data: { title: 'Unwohl' } });
      setTimeout(function () {
        var beschwerden = document.getElementById('beschwerden')
        beschwerden.style.opacity = "1.0";
        var input = document.getElementById('beschwerden-input')
        var fab = document.getElementById('beschwerden-fab')
        input.style.opacity = "1.0"
        fab.style.opacity = "1.0"
      }, 1500);
    };
  }

  if (page.id === 'start') {
    page.querySelector('#termin-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/termin.html', { data: { title: 'Arzttermin' } });
    };
  }
});

// Beschwerden analysieren
function Beschwerden() {
  var input = document.getElementById("beschwerden-input").value
  var bubble = document.getElementById('user-beschwerden')
  bubble.innerHTML = "<p id='p-user-beschwerden'>" + input + "</p>"
  bubble.style.opacity = "1"
  document.getElementById("beschwerden-input").value = ""
  document.getElementById("beschwerden-input").style.opacity = "0"
  document.getElementById("beschwerden-fab").style.opacity = "0"

  //Antwort auf Input
  setTimeout(function () {
    var user = document.getElementById("p-user-beschwerden").innerHTML
    var bubble = document.getElementById("bot-nachfrage")
    var symptome1 = ["Kopfschmerzen", "hinter", "Augen", "morgens", "abends"]
    var symptome2 = ["Fieber", "steif", "Nacken"]
    if (symptome1.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Eingeschränkte Sicht"
      document.getElementById('label-check-2').innerHTML = "Magen-Darm-Beschwerden"
      document.getElementById('label-check-3').innerHTML = "Appetitlosigkeit"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("migraene-fab").style.display = "block"
      return;
    } else if (symptome2.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Gliederschmerzen"
      document.getElementById('label-check-2').innerHTML = "Kopfschmerzen"
      document.getElementById('label-check-3').innerHTML = "Übelkeit"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("meni-fab").style.display = "block"
      return;
    } else {
      bubble.innerHTML = "<p>Ich kann Ihre Symptome leider nicht auswerten. Bitte versuchen Sie es erneut.</p>"
      bubble.style.opacity = "1"
      // Zurück zu Symptom-Eingabe
      setTimeout(function () {
        document.getElementById("user-beschwerden").innerHTML = ""
        document.getElementById("user-beschwerden").style.opacity = "0"
        document.getElementById("beschwerden-input").style.opacity = "1"
        document.getElementById("beschwerden-fab").style.opacity = "1"
        bubble.innerHTML = ""
        bubble.style.opacity = "0"
      }, 2000)
    }
  }, 1500)
}

function Migraene() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "eingeschränkte Sicht"
  var label2 = "Magen-Darm-Beschwerden"
  var label3 = "Appetitlosigkeit"
  // Auswahl Liste in Chat anzeigen
  if (check1 == true) {
    var user = "<p>Ich habe " + label1 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check2 == true) {
    var user = "<p>Ich habe " + label2 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check3 == true) {
    var user = "<p>Ich habe " + label3 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check1 == true && check2 == true) {
    var user = "<p>Ich habe " + label1 + " und " + label2 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check1 == true && check3 == true) {
    var user = "<p>Ich habe " + label1 + " und " + label3 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check2 == true && check3 == true) {
    var user = "<p>Ich habe " + label2 + " und " + label3 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  if (check1 == true && check2 == true && check3 == true) {
    var user = "<p>Ich habe " + label1 + ", " + label2 + " und " + label3 + ".</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("migraene-fab").style.display = "none"
  // Warnung anzeigen
  setTimeout(function () {
    document.getElementById("diagnose-migraene").style.opacity = "1"
    document.getElementById("diagnose-migraene").scrollIntoView({ behavior: "smooth" });
  }, 1000)
  // Zurück zum Start
  setTimeout(function () {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  }, 4000)
}

function Meni() {
  console.log("du hast meningitis")
}