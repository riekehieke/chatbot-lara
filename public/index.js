window.onload = Reload

// Registrierungscode-Eingabe
function regCode() {
  var regCode = document.getElementById("reg-code").value
  if (regCode === "789456123") {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } })
    localStorage.setItem('regCode', 'yes')
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
        document.getElementById("kein-problem").style.opacity = "1"
        setTimeout(function () {
          document.getElementById("bot-zeigen").style.opacity = "1"
          document.getElementById("apo-list").style.opacity = "1"
          document.getElementById("start-btn").style.opacity = "1"
        }, 1000)
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
  document.getElementById("meni-fab").style.display = "none"
  setTimeout(function () {
    document.getElementById("diagnose-meni").style.display = "block"
    document.getElementById("diagnose-meni").scrollIntoView({ behavior: "smooth" });
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// ARZTTERMIN VEREINBAREN
// Mindest Datum Morgen
function MinDate() {
  var heute = new Date()
  var monat = heute.getMonth() + 1
  var tag = heute.getDate()
  var jahr = heute.getFullYear()
  if (monat < 10)
    monat = '0' + monat.toString()
  if (tag < 10)
    tag = '0' + tag.toString()
  var minDate = jahr + '-' + monat + '-' + tag
  console.log(minDate)
  document.getElementById('datum-input').setAttribute('min', minDate)
  console.log('minified')
}

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
  document.getElementById("aerzte-fab").style.display = "none"
  setTimeout(DatumEingabe(), 1000)
}

// Datum eingeben
function DatumEingabe() {
  document.getElementById('frage-termin').style.opacity = "1"
  document.getElementById('frage-termin').scrollIntoView({ behavior: "smooth" })
  MinDate()
  document.getElementById('datum-input').style.opacity = "1"
  document.getElementById('datum-fab').style.display = "block"
}

// Datum anzeigen, Uhrzeit fragen
var date
function Datum() {
  var datum = document.getElementById("datum-input").value
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
  document.getElementById("termine-fab").style.display = "none"
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
      var rezeptArzt = document.getElementById("rezept-arzt")
      rezeptArzt.style.display = "block"
      rezeptArzt.scrollIntoView({ behavior: "smooth" })
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
  var labelMedi1 = document.getElementById("label-medi-1").innerHTML
  var labelMedi2 = document.getElementById("label-medi-2").innerHTML
  var labelMedi3 = document.getElementById("label-medi-3").innerHTML
  var labelMedi4 = document.getElementById("label-medi-4").innerHTML
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
  setTimeout(function () {
    document.getElementById("bot-frage-uhrzeit").style.opacity = "1"
    document.getElementById("uhrzeit-input").style.opacity = "1"
    document.getElementById("uhrzeit-fab").style.display = "block"
  }, 1500)
}

// Uhrzeit eingeben
function Uhrzeit() {
  document.getElementById("uhrzeit-fab").style.display = "none"
  var zeit = document.getElementById("uhrzeit-input")
  zeit.style.opacity = "0"
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
  document.querySelector('#nav').pushPage('pages/einstellungen.html', { data: { title: 'Meine Akte' } });
}
// Context-Menu Auswahl "Impressum"
function Impressum() {
  document.querySelector('#nav').pushPage('pages/impressum.html', { data: { title: 'Meine Akte' } });
}

// FUNKTIONEN BEI BUTTON CLICK
// Rezept Storage löschen
function Clear() {
  localStorage.setItem('rezept', 'no')
  document.querySelector("#qr-rezept-akte").style.display = "none"
  document.getElementById("qr-rezept-fail-akte").style.display = "block"
}
// RegCode Storage löschen
function Logout() {
  localStorage.setItem('regCode', 'no')
  location.reload()
}
// LocalStorage komplett löschen
function Reset() {
  localStorage.clear()
  location.reload()
}
// Zurück zum Start
function Start() {
  location.reload()
}