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
