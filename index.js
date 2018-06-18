document.addEventListener('init', function (event) {
  var page = event.target;
});
document.addEventListener("keyup", function () {
  var regCode = document.querySelector("ons-input").value;
  if (regCode === "1") {
    document.querySelector('#nav').pushPage('pages/start.html', { data: { title: 'Page 2' } });
  }
});