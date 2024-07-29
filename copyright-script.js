window.addEventListener("load", function () {
  // First script's logic here
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    if (spans[i].textContent.includes("©")) {
      var existingText = spans[i].textContent;
      var yearPosition = existingText.indexOf("©") + 2;
      var restOfText = existingText.substring(yearPosition + 4);

      var now = new Date();
      var currentYear = now.getFullYear();

      spans[i].textContent = "© " + currentYear + restOfText;
    }
  }

  // Second script's logic here
  for (var i = 0; i < spans.length; i++) {
    if (spans[i].textContent.includes("EXP.")) {
      var now = new Date();
      var nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      var newDate =
        "EXP. " +
        String(nextMonth.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(nextMonth.getDate()).padStart(2, "0") +
        "-" +
        String(nextMonth.getFullYear()).slice(-2);

      spans[i].textContent = newDate;
    }
  }
});
console.log("Copy script");
