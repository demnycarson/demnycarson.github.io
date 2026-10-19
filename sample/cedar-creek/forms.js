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
// sample business hours (Mon-Sat, 7am-7pm, 2-hour arrival windows).
(function () {
  var els = document.querySelectorAll("[data-next]");
  if (!els.length) return;
  function fmt(h) { var s = h >= 12 ? "pm" : "am"; var x = h % 12 || 12; return x + s; }
  var now = new Date(), day = now.getDay(), h = now.getHours() + (now.getMinutes() > 0 ? 1 : 0);
  var start = h + 1; if (start % 2) start++;
  var label;
  if (day !== 0 && start >= 8 && start <= 17) label = "Next opening: today, " + fmt(start) + "–" + fmt(start + 2);
  else if (day !== 0 && start < 8) label = "Next opening: today, 8am–10am";
  else label = "Next opening: " + (day === 6 || day === 0 ? "Monday" : "tomorrow") + ", 8am–10am";
  els.forEach(function (el) { el.textContent = label; });
})();
