window.onload = Reload

// Registrierungscode-Eingabe
function regCode() {
  var regCode = document.getElementById("reg-code").value
  if (regCode.length == 9) {
    console.log("9");
    if (regCode === "789456123") {
      document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } })
      localStorage.setItem('regCode', 'yes')
      var rezept = localStorage.getItem('rezept')
      console.log(rezept)
      if (!rezept) {
        localStorage.setItem('rezept', 'no')
        console.log("rezept no")
      }
    } else {
      console.log("Hier Fehlerwarnung")
      alert("Der von Ihnen eingegebene Code ist nicht gültig. Ein gültiger Code besteht aus 9 Ziffern. Bitte prüfen Sie Ihre Eingabe und versuchen Sie es erneut. Sollte Ihr Code weiterhin nicht akzeptiert werden, wenden Sie sich bitte an Ihre Krankenkasse.")
    }
  }
}

// Seite neu laden
function Reload() {
  var regCode = localStorage.getItem('regCode')
  if (regCode === 'yes') {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  }
}

// Startseite Button Auswahl
document.addEventListener('init', function (event) {
  var page = event.target;

  // Unwohl Seite
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
    }
  }

  // Arzttermin Seite
  if (page.id === 'start') {
    page.querySelector('#termin-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/termin.html', { data: { title: 'Arzttermin' } });
      setTimeout(function () {
        document.getElementById("klar").style.opacity = "1"
        setTimeout(function () {
          document.getElementById("arzt-auswahl").style.opacity = "1"
          document.getElementById("aerzte-liste").style.opacity = "1"
          document.getElementById("aerzte-fab").style.display = "block"
        }, 1000)
      }, 1500)
    };
  }

  // Neues Rezept Seite
  if (page.id === 'start') {
    page.querySelector('#rezept-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/rezept.html', { data: { title: 'Rezept Erneuerung' } });
      setTimeout(function () {
        document.getElementById("okay").style.opacity = "1"
        setTimeout(function () {
          document.getElementById("medi-auswahl").style.opacity = "1"
          document.getElementById("medi-liste").style.opacity = "1"
          document.getElementById("medi-liste").scrollIntoView({ behavior: "smooth" })
          document.getElementById("medi-fab").style.display = "block"
        }, 1000)
      }, 1500)
    };
  }

  // Nächste Apotheke Seite
  if (page.id === 'start') {
    page.querySelector('#apotheke-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/apotheke.html', { data: { title: 'Apotheke finden' } });
      setTimeout(function () {
        document.getElementById("bot-umkreis").style.opacity = "1"
        document.getElementById("range").style.display = "block"
        document.getElementById("apo-fab").style.display = "block"
      }, 1500)
    };
  }

  // Medikamente-Erinnerung Seite
  if (page.id === 'start') {
    page.querySelector('#erinnerung-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/erinnerung.html', { data: { title: 'An Medikamente erinnern' } });
      setTimeout(function () {
        document.getElementById("ordnung").style.opacity = "1"
        setTimeout(function () {
          document.getElementById("bot-show-medi").style.opacity = "1"
          document.getElementById("medi-liste2").style.opacity = "1"
          document.getElementById("medi-liste2").scrollIntoView({ behavior: "smooth" })
          document.getElementById("medi-fab2").style.display = "block"
        }, 1000)
      }, 1500)
    };
  }

})

// SYMPTOME ANALYSIEREN
// Button: Beschwerden analysieren
function Beschwerden() {
  var input = document.getElementById("beschwerden-input").value
  if (input === "") {
    ons.notification.alert({
      message: 'Bitte geben Sie Ihre Beschwerden ein.',
      title: "Fehler"
    })
    return
  }
  var bubble = document.getElementById('user-beschwerden')
  bubble.innerHTML = "<p id='p-user-beschwerden'>" + input + "</p>"
  bubble.style.opacity = "1"
  document.getElementById("beschwerden-input").value = ""
  document.getElementById("beschwerden-input").style.opacity = "0"
  document.getElementById("beschwerden-fab").style.opacity = "0"
  setTimeout(function () {
    var user = document.getElementById("p-user-beschwerden").innerHTML
    var bubble = document.getElementById("bot-nachfrage")
    // !! Arrays mit Krankheiten
    var symptome1 = ["Kopfschmerzen", "hinter", "Augen", "morgens", "abends"]
    var symptome2 = ["Fieber", "steif", "Nacken"]
    var symptome3 = ["zugenommen", "Gewicht", "Müde", "Müdigkeit", "nicht konzentrieren", "konzentrieren", "Konzentration", "Desinteresse", "Appetit", "Appetitlosigkeit", "Verstopfung"]
    var symptome4 = ["Husten", "Schnupfen", "Nase läuft"]
    var symptome5 = ["Halsschmerzen", "Mandeln", "gerötet", "rot", "geschwollen"]
    var symptome6 = ["Übelkeit", "übel", "schlecht", "brechen", "übergeben", "Durchfall", "Bauch", "Bauchschmerzen"]
    var symptome7 = ["vergesslich", "Vergesslichkeit", "Blässe", "blass", "brüchig", "Nägel"]
    var symptome8 = ["Juckreiz", "jucken", "juckt", "unangenehm", "Durst", "Gewichtsverlust", "Gewicht", "wiege", "plötzlich", "Sehvermögen", "sehe"]
    // Arrays mit Krankheiten !!
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
    } else if (symptome3.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Antriebslosigkeit"
      document.getElementById('label-check-2').innerHTML = "Verlangsamung"
      document.getElementById('label-check-3').innerHTML = "Kälteempfindlichkeit"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("schild-fab").style.display = "block"
      return;
    } else if (symptome4.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Heiserkeit"
      document.getElementById('label-check-2').innerHTML = "Halsschmerzen"
      document.getElementById('label-check-3').innerHTML = "Frösteln"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("kalt-fab").style.display = "block"
      return;
    } else if (symptome5.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Schluckbeschwerden"
      document.getElementById('label-check-2').innerHTML = "Abgeschlagenheit"
      document.getElementById('label-check-3').innerHTML = "Mundgeruch"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("mandel-fab").style.display = "block"
      return;
    } else if (symptome6.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Verstopfung"
      document.getElementById('label-check-2').innerHTML = "belegte Zunge"
      document.getElementById('label-check-3').innerHTML = "Fieber"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("blind-fab").style.display = "block"
      return;
    } else if (symptome7.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "Müdigkeit"
      document.getElementById('label-check-2').innerHTML = "Infektanfälligkeit"
      document.getElementById('label-check-3').innerHTML = "Depressionen"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("eisen-fab").style.display = "block"
      return;
    } else if (symptome8.some(el => user.includes(el))) {
      bubble.innerHTML = "<p>Haben Sie außerdem eines oder mehrere dieser Symptome?</p>"
      bubble.style.opacity = "1"
      document.getElementById('label-check-1').innerHTML = "ausgeprägter Harndrang"
      document.getElementById('label-check-2').innerHTML = "ständige Müdigkeit"
      document.getElementById('label-check-3').innerHTML = "Übelkeit"
      document.getElementById("symptome-liste").style.opacity = "1"
      document.getElementById("symptome-liste").scrollIntoView({ behavior: "smooth" });
      document.getElementById("dia-fab").style.display = "block"
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
      }, 4000)

    }
  }, 1500)
}

// Button: Migräne weitere Beschwerden
function Migraene() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "eingeschränkte Sicht"
  var label2 = "Magen-Darm-Beschwerden"
  var label3 = "Appetitlosigkeit"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("migraene-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-migraene").style.display = "block"
    document.getElementById("diagnose-migraene").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Meningitis weitere Beschwerden
function Meni() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Gliederschmerzen"
  var label2 = "Kopfschmerzen"
  var label3 = "Übelkeit"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("meni-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-meni").style.display = "block"
    document.getElementById("diagnose-meni").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Schilddrüse weitere Beschwerden
function Schild() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Antriebslosigkeit"
  var label2 = "Verlangsamung"
  var label3 = "Kälteempfindlichkeit"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("schild-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-schild").style.display = "block"
    document.getElementById("diagnose-schild").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    var unwohlArzt = document.getElementById("unwohl-arzt")
    unwohlArzt.style.display = "block"
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Schilddrüse weitere Beschwerden
function Kalt() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Heiserkeit"
  var label2 = "Halsschmerzen"
  var label3 = "Frösteln"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("kalt-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-kalt").style.display = "block"
    document.getElementById("diagnose-kalt").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Mandel weitere Beschwerden
function Mandel() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Schluckbeschwerden"
  var label2 = "Abgeschlagenheit"
  var label3 = "Mundgeruch"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("mandel-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-mandel").style.display = "block"
    document.getElementById("diagnose-mandel").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    var unwohlArzt = document.getElementById("unwohl-arzt")
    unwohlArzt.style.display = "block"
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Blinddarm weitere Beschwerden
function Blind() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Verstopfung"
  var label2 = "eine belegte Zunge"
  var label3 = "Fieber"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("blind-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-blind").style.display = "block"
    document.getElementById("diagnose-blind").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Eisenmangel weitere Beschwerden
function Eisen() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Müdigkeit"
  var label2 = "Infektanfälligkeit"
  var label3 = "Depressionen"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("eisen-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-eisen").style.display = "block"
    document.getElementById("diagnose-eisen").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Button: Diabetes weitere Beschwerden
function Dia() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "ausgeprägten Harndrang"
  var label2 = "ständige Müdigkeit"
  var label3 = "Übelkeit"
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
  if (check1 == false && check2 == false && check3 == false) {
    var user = "<p>Ich habe keine weiteren Beschwerden.</p>"
    document.getElementById("user-liste").innerHTML = user
    document.getElementById("user-liste").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("dia-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-dia").style.display = "block"
    document.getElementById("diagnose-dia").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// ARZTTERMIN VEREINBAREN
// Arzt auswählen
function Termin() {
  var radio1 = document.getElementById("arzt-1").checked
  var radio2 = document.getElementById("arzt-2").checked
  var radio3 = document.getElementById("arzt-3").checked
  var radio4 = document.getElementById("arzt-4").checked
  var arzt1 = "Dr. Mammes"
  var arzt2 = "Dr. Najuch"
  var arzt3 = "Dr. Grotelüschen"
  var arzt4 = "Dr. Bittermann"
  if (radio1 == true) {
    var user = "<p>Ich möchte einen Termin bei " + arzt1 + " machen.</p>"
    document.getElementById("user-liste-arzt").innerHTML = user
    document.getElementById("user-liste-arzt").scrollIntoView({ behavior: "smooth" });
  }
  if (radio2 == true) {
    var user = "<p>Ich möchte einen Termin bei " + arzt2 + " machen.</p>"
    document.getElementById("user-liste-arzt").innerHTML = user
    document.getElementById("user-liste-arzt").scrollIntoView({ behavior: "smooth" });
  }
  if (radio3 == true) {
    var user = "<p>Ich möchte einen Termin bei " + arzt3 + " machen.</p>"
    document.getElementById("user-liste-arzt").innerHTML = user
    document.getElementById("user-liste-arzt").scrollIntoView({ behavior: "smooth" });
  }
  if (radio4 == true) {
    var user = "<p>Ich möchte einen Termin bei " + arzt4 + " machen.</p>"
    document.getElementById("user-liste-arzt").innerHTML = user
    document.getElementById("user-liste-arzt").scrollIntoView({ behavior: "smooth" });
  }
  if (radio1 == false && radio2 == false && radio3 == false && radio4 == false) {
    ons.notification.alert({
      message: 'Bitte wählen Sie einen Arzt aus.',
      title: "Fehler"
    })
    return
  }
  document.getElementById("aerzte-fab").style.display = "none"
  setTimeout(DatumEingabe(), 1000)
}

// Datum eingeben
function DatumEingabe() {
  document.getElementById('frage-termin').style.opacity = "1"
  document.getElementById('frage-termin').scrollIntoView({ behavior: "smooth" })
  document.getElementById('datum-input').style.opacity = "1"
  document.getElementById('datum-fab').style.display = "block"
}

// Datum anzeigen, Uhrzeit fragen
var date
function Datum() {
  var datum = document.getElementById("datum-input").value
  var heute = new Date()
  var monat = heute.getMonth() + 1
  var tag = heute.getDate()
  var jahr = heute.getFullYear()
  if (monat < 10)
    monat = '0' + monat.toString()
  if (tag < 10)
    tag = '0' + tag.toString()
  var minDate = jahr + '-' + monat + '-' + tag
  if (datum === "") {
    ons.notification.alert({
      message: 'Bitte geben Sie ein Datum ein.',
      title: "Fehler"
    })
    return
  }
  if (datum < minDate) {
    ons.notification.alert({
      message: 'Ein Termin kann frühstens für heute gemacht werden. Bitte geben Sie ein gültiges Datum ein.',
      title: "Fehler"
    })
    return
  }
  var datumArray = datum.split("-")
  var jahr = datumArray[0]
  var monat = datumArray[1]
  var tag = datumArray[2]
  date = tag + '.' + monat + '.' + jahr
  var user = document.getElementById("user-datum")
  document.getElementById('datum-input').style.opacity = "0"
  document.getElementById('datum-fab').style.display = "none"
  user.innerHTML = "<p>Der Termin sollte am besten am " + date + " sein.</p>"
  user.style.opacity = "1"
  user.scrollIntoView({ behavior: "smooth" })
  setTimeout(function () {
    document.getElementById("frage-zeit").style.opacity = "1"
    document.getElementById("termine-liste").style.opacity = "1"
    document.getElementById("termine-liste").scrollIntoView({ behavior: "smooth" })
    document.getElementById("termine-fab").style.display = "block"
  }, 1500)
}

// Zeit auswählen & anzeigen
function Zeit() {
  var zeit1 = document.getElementById("termin-1").checked
  var zeit2 = document.getElementById("termin-2").checked
  var zeit3 = document.getElementById("termin-3").checked
  var zeit4 = document.getElementById("termin-4").checked
  var zeit5 = document.getElementById("termin-5").checked
  var termin1 = document.getElementById("label-termin-1").innerHTML
  var termin2 = document.getElementById("label-termin-2").innerHTML
  var termin3 = document.getElementById("label-termin-3").innerHTML
  var termin4 = document.getElementById("label-termin-4").innerHTML
  if (zeit1 == true) {
    var user = "<p>Ich möchte den Termin um " + termin1 + " wahrnehmen.</p>"
    document.getElementById("user-zeit").innerHTML = user
    document.getElementById("user-zeit").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + date + " um " + termin1 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }, 1500)
  }
  if (zeit2 == true) {
    var user = "<p>Ich möchte den Termin um " + termin2 + " wahrnehmen.</p>"
    document.getElementById("user-zeit").innerHTML = user
    document.getElementById("user-zeit").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + date + " um " + termin2 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }, 1500)
  }
  if (zeit3 == true) {
    var user = "<p>Ich möchte den Termin um " + termin3 + " wahrnehmen.</p>"
    document.getElementById("user-zeit").innerHTML = user
    document.getElementById("user-zeit").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + date + " um " + termin3 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }, 1500)
  }
  if (zeit4 == true) {
    var user = "<p>Ich möchte den Termin um " + termin4 + " wahrnehmen.</p>"
    document.getElementById("user-zeit").innerHTML = user
    document.getElementById("user-zeit").scrollIntoView({ behavior: "smooth" });
    setTimeout(function () {
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + date + " um " + termin4 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }, 1500)
  }
  if (zeit5 == true) {
    document.getElementById("user-datum").style.opacity = "0"
    document.getElementById("frage-zeit").style.opacity = "0"
    document.getElementById("termine-liste").style.opacity = "0"
    DatumEingabe()
    return
  }
  if (zeit1 == false && zeit2 == false && zeit3 == false && zeit4 == false && zeit5 == false) {
    ons.notification.alert({
      message: 'Bitte treffen Sie eine Auswahl.',
      title: "Fehler"
    })
    return
  }
  document.getElementById("termine-fab").style.display = "none"
}

// REZEPT ERNEUERN
// Medikament auswählen
function Medi() {
  var medi1 = document.getElementById("medi-1").checked
  var medi2 = document.getElementById("medi-2").checked
  var medi3 = document.getElementById("medi-3").checked
  var medi4 = document.getElementById("medi-4").checked
  var labelMedi1 = document.getElementById("label-medi-1").innerHTML
  var labelMedi2 = document.getElementById("label-medi-2").innerHTML
  var labelMedi3 = document.getElementById("label-medi-3").innerHTML
  var labelMedi4 = document.getElementById("label-medi-4").innerHTML
  var rezeptMedi = document.getElementById("rezept-medi")
  var rezeptMediFail = document.getElementById("rezept-medi-fail")
  var user = document.getElementById("user-medi-liste")
  if (medi1 == true) {
    user.innerHTML = "<p>Ich benötige ein neues Rezept für " + labelMedi1 + ".</p>"
    user.style.opacity = "1"
    user.scrollIntoView({ behavior: "smooth" })
    rezeptMedi.innerHTML = "Für " + labelMedi1 + " steht bereit. Bitte zeigen Sie diesen QR-Code in der Apotheke vor, um ihr Medikament zu erhalten."
  }
  if (medi2 == true) {
    user.innerHTML = "<p>Ich benötige ein neues Rezept für " + labelMedi2 + ".</p>"
    user.style.opacity = "1"
    user.scrollIntoView({ behavior: "smooth" })
    rezeptMedi.innerHTML = "Für " + labelMedi2 + " steht bereit. Bitte zeigen Sie diesen QR-Code in der Apotheke vor, um ihr Medikament zu erhalten."
  }
  if (medi3 == true) {
    user.innerHTML = "<p>Ich benötige ein neues Rezept für " + labelMedi3 + ".</p>"
    user.style.opacity = "1"
    user.scrollIntoView({ behavior: "smooth" })
    rezeptMediFail.innerHTML = "Ihre Anfrage für " + labelMedi3 + " wurde vorerst von Ihrem Arzt abgelehnt. Bitte vereinbaren Sie einen Arzttermin."
  }
  if (medi4 == true) {
    user.innerHTML = "<p>Ich benötige ein neues Rezept für " + labelMedi4 + ".</p>"
    user.style.opacity = "1"
    user.scrollIntoView({ behavior: "smooth" })
    rezeptMedi.innerHTML = "Für " + labelMedi4 + " steht bereit. Bitte zeigen Sie diesen QR-Code in der Apotheke vor, um ihr Medikament zu erhalten."
  }
  if (medi1 == false && medi2 == false && medi3 == false && medi4 == false) {
    ons.notification.alert({
      message: 'Bitte wählen Sie ein Medikament aus.',
      title: "Fehler"
    })
    return
  }
  document.getElementById("medi-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("bot-medi-bestätigung").style.opacity = "1"
  }, 1500)
  setTimeout(function () {
    // Digitales Rezept anzeigen (nach 5 Sekunden Wartezeit)
    if (medi1 == true || medi2 == true || medi4 == true) {
      localStorage.setItem('rezept', 'yes')
      var rezeptQR = document.getElementById("qr-rezept")
      rezeptQR.style.display = "block"
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }
    if (medi3 == true) {
      localStorage.setItem('rezept', 'no')
      var rezeptQRFail = document.getElementById("qr-rezept-fail")
      rezeptQRFail.style.display = "block"
      var startBtn = document.getElementById("start-btn2")
      var rezeptArzt = document.getElementById("rezept-arzt")
      rezeptArzt.style.display = "block"
      startBtn.style.display = "block"
      startBtn.scrollIntoView({ behavior: "smooth" })
    }
  }, 5000)
}

// Weiterleitung Arzttermin vereinbaren
function Arzt() {
  document.querySelector('#nav').pushPage('pages/termin.html', { data: { title: 'Arzttermin' } });
  setTimeout(function () {
    document.getElementById("klar").style.opacity = "1"
    setTimeout(function () {
      document.getElementById("arzt-auswahl").style.opacity = "1"
      document.getElementById("aerzte-liste").style.opacity = "1"
      document.getElementById("aerzte-fab").style.display = "block"
    }, 1000)
  }, 1500)
}

// MEDIKAMENTEN ERINNERUNG EINSTELLEN
// Medikament auswählen
function Erinnerung() {
  var medi1 = document.getElementById("medi-1").checked
  var medi2 = document.getElementById("medi-2").checked
  var medi3 = document.getElementById("medi-3").checked
  var medi4 = document.getElementById("medi-4").checked
  var medi5 = document.getElementById("medi-5").checked
  var labelMedi1 = document.getElementById("label-medi-1").innerHTML
  var labelMedi2 = document.getElementById("label-medi-2").innerHTML
  var labelMedi3 = document.getElementById("label-medi-3").innerHTML
  var labelMedi4 = document.getElementById("label-medi-4").innerHTML
  var labelMedi5 = document.getElementById("label-medi-5").innerHTML
  var mediAuswahlUser = document.getElementById("medi-auswahl-user")
  if (medi1 == true) {
    mediAuswahlUser.innerHTML = "<p>Ich möchte daran erinnert werden, " + labelMedi1 + " einzunehmen.</p>"
    mediAuswahlUser.style.opacity = "1"
    mediAuswahlUser.scrollIntoView({ behavior: "smooth" })
    document.getElementById("medi-fab2").style.display = "none"
  }
  if (medi2 == true) {
    mediAuswahlUser.innerHTML = "<p>Ich möchte daran erinnert werden, " + labelMedi2 + " einzunehmen.</p>"
    mediAuswahlUser.style.opacity = "1"
    mediAuswahlUser.scrollIntoView({ behavior: "smooth" })
    document.getElementById("medi-fab2").style.display = "none"
  }
  if (medi3 == true) {
    mediAuswahlUser.innerHTML = "<p>Ich möchte daran erinnert werden, " + labelMedi3 + " einzunehmen.</p>"
    mediAuswahlUser.style.opacity = "1"
    mediAuswahlUser.scrollIntoView({ behavior: "smooth" })
    document.getElementById("medi-fab2").style.display = "none"
  }
  if (medi4 == true) {
    mediAuswahlUser.innerHTML = "<p>Ich möchte daran erinnert werden, " + labelMedi4 + " einzunehmen.</p>"
    mediAuswahlUser.style.opacity = "1"
    mediAuswahlUser.scrollIntoView({ behavior: "smooth" })
    document.getElementById("medi-fab2").style.display = "none"
  }
  if (medi5 == true) {
    document.getElementById("medi-fab2").style.display = "none"
    document.getElementById('medikament-input').style.display = "block"
    document.getElementById('medikament-fab').style.display = "block"
    return
  }
  if (medi1 == false && medi2 == false && medi3 == false && medi4 == false && medi5 == false) {
    ons.notification.alert({
      message: 'Bitte wählen Sie ein Medikament aus.',
      title: "Fehler"
    })
    return
  }
  setTimeout(function () {
    document.getElementById("bot-intervall-frage").style.opacity = "1"
    var liste = document.getElementById("intervall-liste")
    liste.style.opacity = "1"
    document.getElementById("intervall-fab").style.display = "block"
    liste.scrollIntoView({ behavior: "smooth" })
  }, 1500)
}

// Eigene Medikamente
function Eigene() {
  var mediAuswahlUser = document.getElementById("medi-auswahl-user")
  document.getElementById('medikament-input').style.display = "none"
  document.getElementById('medikament-fab').style.display = "none"
  mediAuswahlUser.style.opacity = "1"
  mediAuswahlUser.scrollIntoView({ behavior: "smooth" })
  var input = document.getElementById('medikament-input').value
  mediAuswahlUser.innerHTML = "<p>Ich möchte daran erinnert werden, " + input + " einzunehmen.</p>"
  setTimeout(function () {
    document.getElementById("bot-intervall-frage").style.opacity = "1"
    var liste = document.getElementById("intervall-liste")
    liste.style.opacity = "1"
    document.getElementById("intervall-fab").style.display = "block"
    liste.scrollIntoView({ behavior: "smooth" })
  }, 1500)
}

// Intervall auswählen
function Intervall() {
  var inter1 = document.getElementById("inter-1").checked
  var inter2 = document.getElementById("inter-2").checked
  var inter3 = document.getElementById("inter-3").checked
  var inter4 = document.getElementById("inter-4").checked
  var inter5 = document.getElementById("inter-5").checked
  var labelInter1 = document.getElementById("label-inter-1").innerHTML
  var labelInter2 = document.getElementById("label-inter-2").innerHTML
  var labelInter3 = document.getElementById("label-inter-3").innerHTML
  var labelInter4 = document.getElementById("label-inter-4").innerHTML
  var labelInter5 = document.getElementById("label-inter-5").innerHTML
  var userIntervallConfirm = document.getElementById("user-intervall-confirm")
  if (inter1 == true) {
    userIntervallConfirm.innerHTML = "<p>Ich möchte " + labelInter1 + " an das Medikament erinnert werden.</p>"
    userIntervallConfirm.style.opacity = "1"
    userIntervallConfirm.scrollIntoView({ behavior: "smooth" })
    document.getElementById("intervall-fab").style.display = "none"
  }
  if (inter2 == true) {
    userIntervallConfirm.innerHTML = "<p>Ich möchte " + labelInter2 + " an das Medikament erinnert werden.</p>"
    userIntervallConfirm.style.opacity = "1"
    userIntervallConfirm.scrollIntoView({ behavior: "smooth" })
    document.getElementById("intervall-fab").style.display = "none"
  }
  if (inter3 == true) {
    userIntervallConfirm.innerHTML = "<p>Ich möchte " + labelInter3 + " an das Medikament erinnert werden.</p>"
    userIntervallConfirm.style.opacity = "1"
    userIntervallConfirm.scrollIntoView({ behavior: "smooth" })
    document.getElementById("intervall-fab").style.display = "none"
  }
  if (inter4 == true) {
    userIntervallConfirm.innerHTML = "<p>Ich möchte " + labelInter4 + " an das Medikament erinnert werden.</p>"
    userIntervallConfirm.style.opacity = "1"
    userIntervallConfirm.scrollIntoView({ behavior: "smooth" })
    document.getElementById("intervall-fab").style.display = "none"
  }
  if (inter5 == true) {
    userIntervallConfirm.innerHTML = "<p>Ich möchte " + labelInter5 + " an das Medikament erinnert werden.</p>"
    userIntervallConfirm.style.opacity = "1"
    userIntervallConfirm.scrollIntoView({ behavior: "smooth" })
    document.getElementById("intervall-fab").style.display = "none"
  }
  if (inter1 == false && inter2 == false && inter3 == false && inter4 == false && inter5 == false) {
    ons.notification.alert({
      message: 'Bitte treffen Sie eine Auswahl.',
      title: "Fehler"
    })
    return
  }
  setTimeout(function () {
    document.getElementById("bot-frage-uhrzeit").style.opacity = "1"
    document.getElementById("uhrzeit-input").style.display = "block"
    document.getElementById("uhrzeit-fab").style.display = "block"
  }, 1500)
}


// Uhrzeit eingeben
function Uhrzeit() {
  var zeit = document.getElementById("uhrzeit-input")
  if (zeit.value === "") {
    ons.notification.alert({
      message: 'Bitte geben Sie eine Uhrzeit ein.',
      title: "Fehler"
    })
    return
  }
  document.getElementById("uhrzeit-fab").style.display = "none"
  zeit.style.display = "none"
  var userConfirm = document.getElementById("user-uhrzeit-confirm")
  userConfirm.innerHTML = "<p>Ich möchte um " + zeit.value + " Uhr erinnert werden.</p>"
  userConfirm.style.opacity = "1"
  setTimeout(function () {
    document.getElementById("bot-confirm-erinnerung").style.opacity = "1"
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1500)
}

// APOTHEKE FINDEN
// Umkreis auswerten
function Apotheke() {
  document.getElementById("range").style.display = "none"
  document.getElementById("apo-fab").style.display = "none"
  var user = document.getElementById('user-msg-umkreis')
  var range = document.getElementById('range-apo').value
  var zeigen = document.getElementById('bot-zeigen')
  var umkreis = range * 10
  if (range == 0) {
    umkreis = 100
  }
  user.innerHTML = '<p>Bitte suche nach Apotheken im Umkreis von ' + umkreis + ' Metern.</p>'
  user.style.opacity = "1"
  var umkreisString = umkreis.toString()
  var umkreisArray = umkreisString.split("")
  var umkreisListe = umkreisArray[0]
  var umkreisListe = parseInt(umkreisListe)
  var umkreisListe = umkreisListe - 1
  var entfernung1 = document.getElementById("entfernung-1")
  var entfernung2 = document.getElementById("entfernung-2")
  var entfernung3 = document.getElementById("entfernung-3")
  var entfernung4 = document.getElementById("entfernung-4")
  var entfernung5 = document.getElementById("entfernung-5")
  entfernung1.innerHTML = "Entfernung: " + umkreisListe + "30 Meter"
  entfernung2.innerHTML = "Entfernung: " + umkreisListe + "70 Meter"
  entfernung3.innerHTML = "Entfernung: " + umkreisListe + "15 Meter"
  entfernung4.innerHTML = "Entfernung: " + umkreisListe + "50 Meter"
  entfernung5.innerHTML = "Entfernung: " + umkreisListe + "20 Meter"
  setTimeout(function () {
    zeigen.innerHTML = '<p>Hier sind alle Apotheken im Umkreis von ' + umkreis + ' Metern.</p>'
    zeigen.style.opacity = "1"
    document.getElementById("apo-list").style.opacity = "1"
    document.getElementById("start-btn").style.opacity = "1"
    document.getElementById("apo-list").scrollIntoView({ behavior: "smooth" })
  }, 1500)
}


// CONTEXT MENU ANZEIGEN
function Menu() {
  document.getElementById("menu-list").classList.toggle("invisible")
}
function MenuAkte() {
  document.getElementById("menu-list-akte").classList.toggle("invisible")
}
function MenuRezept() {
  document.getElementById("menu-list-rezept").classList.toggle("invisible")
}
function MenuApo() {
  document.getElementById("menu-list-apo").classList.toggle("invisible")
}
function MenuEinst() {
  document.getElementById("menu-list-einst").classList.toggle("invisible")
}
function MenuErin() {
  document.getElementById("menu-list-erin").classList.toggle("invisible")
}
function MenuImp() {
  document.getElementById("menu-list-imp").classList.toggle("invisible")
}
function MenuTermin() {
  document.getElementById("menu-list-termin").classList.toggle("invisible")
}
function MenuUnwohl() {
  document.getElementById("menu-list-unwohl").classList.toggle("invisible")
}

// Context-Menu Auswahl "Akte"
function Akte() {
  document.querySelector('#nav').pushPage('pages/akte.html', { data: { title: 'Meine Akte' } });
  setTimeout(function () {
    var rezept = localStorage.getItem('rezept')
    if (rezept === 'yes') {
      document.querySelector("#qr-rezept-akte").style.display = "block"
    }
    if (rezept === 'no') {
      document.getElementById("qr-rezept-fail-akte").style.display = "block"
    }
  }, 500)
}
// Context-Menu Auswahl "Einstellungen"
function Einstellungen() {
  document.querySelector('#nav').pushPage('pages/einstellungen.html', { data: { title: 'Einstellungen' } });
}
// Context-Menu Auswahl "Symptom-Katalog"
function Katalog() {
  document.querySelector('#nav').pushPage('pages/katalog.html', { data: { title: 'Symptom-Katalog' } });
}
// Context-Menu Auswahl "Impressum"
function Impressum() {
  document.querySelector('#nav').pushPage('pages/impressum.html', { data: { title: 'Impressum' } });
}

// FUNKTIONEN BEI BUTTON CLICK
// Rezept Storage löschen
function Clear() {
  localStorage.setItem('rezept', 'no')
  hideClearAlert()
}
// Clear Alert
function ClearAlert() {
  var dialog = document.getElementById('clear-alert');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('alert-clear.html', { append: true })
      .then(function (dialog) {
        dialog.show();
      });
  }
}
// Hide Clear Alert
function hideClearAlert() {
  document
    .getElementById('clear-alert')
    .hide();
}
// RegCode Storage löschen
function Logout() {
  localStorage.setItem('regCode', 'no')
  location.reload()
}
// Logout Alert
function LogoutAlert() {
  var dialog = document.getElementById('logout-alert');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('alert-logout.html', { append: true })
      .then(function (dialog) {
        dialog.show();
      });
  }
}
// Hide Logout Alert
function hideLogoutAlert() {
  document
    .getElementById('logout-alert')
    .hide();
}
// LocalStorage komplett löschen
function Reset() {
  localStorage.clear()
  location.reload()
}
// Reset Alert
function ResetAlert() {
  var dialog = document.getElementById('reset-alert');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('alert-reset.html', { append: true })
      .then(function (dialog) {
        dialog.show();
      });
  }
}
// Hide Logout Alert
function hideResetAlert() {
  document
    .getElementById('reset-alert')
    .hide();
}
// Zurück zum Start
function Start() {
  location.reload()
}