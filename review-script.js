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
console.log("Review script");
