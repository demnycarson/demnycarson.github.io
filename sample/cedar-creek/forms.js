// Sample site: forms are shown working but do not send anywhere.
// On a real client site (hosted on Netlify), the data-netlify attribute
// makes each named form deliver to the owner's inbox.
(function () {
  var forms = document.querySelectorAll("form[data-demo-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = form.getAttribute("name") || "contact";
      var label = form.querySelector("[data-form-label]");
      if (label) label.textContent = name;
      var box = form.closest(".card-form") || form;
      box.classList.add("sent");
      var done = box.querySelector(".form-done");
      if (done) { done.setAttribute("tabindex", "-1"); done.focus(); }
    });
  });
})();

// "Next opening" in the hero, worked out from the visitor's clock and the
// sample business hours: Mon-Sat, 7am-7pm, in 2-hour arrival windows
// (7-9, 9-11, 11-1, 1-3, 3-5, 5-7). A window must start at least an hour from now.
(function () {
  var els = document.querySelectorAll("[data-next]");
  if (!els.length) return;
  function fmt(h) { var s = h >= 12 && h < 24 ? "pm" : "am"; var x = h % 12 || 12; return x + s; }
  var now = new Date(), day = now.getDay();
  var earliest = now.getHours() + 1 + (now.getMinutes() > 0 ? 1 : 0);
  var start = 7;
  while (start < earliest) start += 2;
  var label;
  if (day !== 0 && start <= 17) label = "Next opening: today, " + fmt(start) + "\u2013" + fmt(start + 2);
  else label = "Next opening: " + (day === 6 || day === 0 ? "Monday" : "tomorrow") + ", 7am\u20139am";
  els.forEach(function (el) { el.textContent = label; });
})();
