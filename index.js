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
    };
  }

});