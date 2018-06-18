document.addEventListener('init', function (event) {
  var page = event.target;
});
document.addEventListener("keyup", function () {
  var regCode = document.querySelector("ons-input").value;
  if (regCode === "123") {
    document.querySelector('#nav').pushPage('page2.html', { data: { title: 'Page 2' } });
  }
});