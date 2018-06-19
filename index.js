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
  bubble.innerHTML = "<p>" + input + "</p>"
  bubble.style.opacity = "1"
  document.getElementById("beschwerden-input").value = ''
}