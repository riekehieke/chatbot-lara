document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'login') {
    document.addEventListener("keyup", function () {
      var regCode = document.querySelector("ons-input").value;
      if (regCode === "1") {
        document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Start' } });
      }
    });
  }
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