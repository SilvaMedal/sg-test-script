// window.addEventListener("load", function () {
//   // First script's logic here
//   var spans = document.getElementsByTagName("span");
//   for (var i = 0; i < spans.length; i++) {
//     if (spans[i].textContent.includes("©")) {
//       var existingText = spans[i].textContent;
//       var yearPosition = existingText.indexOf("©") + 2;
//       var restOfText = existingText.substring(yearPosition + 4);

//       var now = new Date();
//       var currentYear = now.getFullYear();

//       spans[i].textContent = "© " + currentYear + restOfText;
//     }
//   }

//   // Second script's logic here
//   for (var i = 0; i < spans.length; i++) {
//     if (spans[i].textContent.includes("EXP.")) {
//       var now = new Date();
//       var nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

//       var newDate =
//         "EXP. " +
//         String(nextMonth.getMonth() + 1).padStart(2, "0") +
//         "-" +
//         String(nextMonth.getDate()).padStart(2, "0") +
//         "-" +
//         String(nextMonth.getFullYear()).slice(-2);

//       spans[i].textContent = newDate;
//     }
//   }
//   console.log("Copyright Script ran");
// });

(function fetchAndUpdateReviewCount() {
  // Replace 'YOUR_PLACE_ID' with the actual PlaceID
  var placeId = document
    .getElementById("masterScript")
    .getAttribute("review-place-id");
  var apiUrl = `https://review-update-automation-3bbb074e12a3.herokuapp.com/get-review-count/${placeId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var reviewCount = data.review_count + "+";
      var reviewElements = document.querySelectorAll(".review-count");
      reviewElements.forEach(function (elem) {
        elem.innerText = reviewCount;
      });
    })
    .catch((error) => console.error("Error fetching review count:", error));
  // Fetch the review count when the page loads
  //   document.addEventListener("DOMContentLoaded", fetchAndUpdateReviewCount);
  //   fetchAndUpdateReviewCount();
})();

document.addEventListener("DOMContentLoaded", function () {
  // Check if the current pathname is the home page "/"
  if (window.location.pathname === "/") {
    // Function to find all FAQ schema scripts and merge them
    function mergeFAQSchemas() {
      // Get all script tags with type "application/ld+json"
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      let combinedFAQSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [],
      };

      // Loop through each script tag
      scripts.forEach((script) => {
        try {
          const schema = JSON.parse(script.innerText);

          // Check if the script contains FAQPage schema
          if (
            schema["@type"] === "FAQPage" &&
            Array.isArray(schema.mainEntity)
          ) {
            // Merge mainEntity arrays
            combinedFAQSchema.mainEntity = combinedFAQSchema.mainEntity.concat(
              schema.mainEntity
            );
            // Remove the original script tag to avoid duplicates
            script.remove();
          }
        } catch (e) {
          console.error("Failed to parse schema JSON:", e);
        }
      });

      // Create a new script tag for the combined FAQ schema
      const newScript = document.createElement("script");
      newScript.type = "application/ld+json";
      newScript.text = JSON.stringify(combinedFAQSchema);
      document.head.appendChild(newScript);
    }

    // Execute the merging function
    mergeFAQSchemas();
  }
});
