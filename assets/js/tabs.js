(function () {
  var tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach(function (group) {
    var buttons = group.querySelectorAll("[data-tab-target]");
    var panels = group.querySelectorAll("[data-tab-panel]");

    function activate(id) {
      buttons.forEach(function (button) {
        var isActive = button.getAttribute("data-tab-target") === id;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach(function (panel) {
        var isActive = panel.getAttribute("data-tab-panel") === id;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        activate(button.getAttribute("data-tab-target"));
      });
    });
  });
})();
