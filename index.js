function regCode() {
  var regCode = document.getElementById("reg-code").value;
  if (regCode === "1") {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  }
}


document.addEventListener('init', function (event) {
  var page = event.target;

  // Zurück zum Start
  document.getElementById("logo-toolbar").onclick = function () {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  }

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
    };
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

  // Nächste Apotheke
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

  // Medikamente-Erinnerung
  if (page.id === 'start') {
    page.querySelector('#medikamente-button').onclick = function () {
      document.querySelector('#nav').pushPage('pages/medikamente.html', { data: { title: 'An Medikamente erinnern' } });
      //   setTimeout(function () {
      //     document.getElementById("okay").style.opacity = "1"
      //     setTimeout(function () {
      //       document.getElementById("medi-auswahl").style.opacity = "1"
      //       document.getElementById("medi-liste").style.opacity = "1"
      //       document.getElementById("medi-liste").scrollIntoView({ behavior: "smooth" })
      //       document.getElementById("medi-fab").style.display = "block"
      //     }, 1000)
      //   }, 1500)
    };
  }
});

function Start() {
  document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
}

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
    document.getElementById("diagnose-migraene").style.display = "block"
    document.getElementById("diagnose-migraene").scrollIntoView({ behavior: "smooth" });
    // Zurück zum Start
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
  // // Zurück zum Start
  // setTimeout(function () {
  //   document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
  // }, 6000)
}

function Meni() {
  var check1 = document.getElementById('check-1').checked
  var check2 = document.getElementById('check-2').checked
  var check3 = document.getElementById('check-3').checked
  var label1 = "Gliederschmerzen"
  var label2 = "Kopfschmerzen"
  var label3 = "Übelkeit"
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
  document.getElementById("meni-fab").style.display = "none"
  // Warnung anzeigen
  setTimeout(function () {
    document.getElementById("diagnose-meni").style.display = "block"
    document.getElementById("diagnose-meni").scrollIntoView({ behavior: "smooth" });
    // Zurück zum Start
    var start = document.getElementById("start-btn")
    start.style.opacity = "1"
    start.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Datum eingeben
function DatumEingabe() {
  document.getElementById('frage-termin').style.opacity = "1"
  document.getElementById('frage-termin').scrollIntoView({ behavior: "smooth" });
  document.getElementById('datum-input').style.opacity = "1"
  document.getElementById('datum-fab').style.display = "block"
}

// Termin: Arzt auswählen
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


// Termin: Datum auswählen
function Datum() {
  var datum = document.getElementById("datum-input").value
  var user = document.getElementById("user-datum")
  document.getElementById('datum-input').style.opacity = "0"
  document.getElementById('datum-fab').style.display = "none"
  user.innerHTML = "<p>Der Termin sollte am besten am " + datum + " sein.</p>"
  user.style.opacity = "1"
  user.scrollIntoView({ behavior: "smooth" })
  setTimeout(function () {
    document.getElementById("frage-zeit").style.opacity = "1"
    document.getElementById("termine-liste").style.opacity = "1"
    document.getElementById("termine-liste").scrollIntoView({ behavior: "smooth" })
    document.getElementById("termine-fab").style.display = "block"
  }, 1500)
}

// Termin: Zeit auswählen
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
      var datum = document.getElementById("datum-input").value
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + datum + " um " + termin1 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      // Zurück zum Start
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
      var datum = document.getElementById("datum-input").value
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + datum + " um " + termin2 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      // Zurück zum Start
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
      var datum = document.getElementById("datum-input").value
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + datum + " um " + termin3 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      // Zurück zum Start
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
      var datum = document.getElementById("datum-input").value
      var confirm = document.getElementById("bot-termin-confirm")
      confirm.innerHTML = "<p>Super. Ich habe Ihren Termin am " + datum + " um " + termin4 + "eingetragen."
      confirm.style.opacity = "1"
      confirm.scrollIntoView({ behavior: "smooth" })
      // Zurück zum Start
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

// Rezept: Medikament auswählen
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
    // Digitales Rezept anzeigen
    if (medi1 == true || medi2 == true || medi4 == true) {
      var rezeptQR = document.getElementById("qr-rezept")
      rezeptQR.style.display = "block"
      var start = document.getElementById("start-btn")
      start.style.opacity = "1"
      start.scrollIntoView({ behavior: "smooth" })
    }
    if (medi3 == true) {
      var rezeptQRFail = document.getElementById("qr-rezept-fail")
      rezeptQRFail.style.display = "block"
      var rezeptArzt = document.getElementById("rezept-arzt")
      rezeptArzt.style.display = "block"
      rezeptArzt.scrollIntoView({ behavior: "smooth" })
    }
  }, 5000)
}

// Rezept-Seite Weiterleitung Arzttermin vereinbaren
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