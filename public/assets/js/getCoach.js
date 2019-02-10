$(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "login.html";
    }

    var coachId = getCoachId();

    var coachRef = firebase.database().ref("/coaches/" + coachId);
    coachRef.on("value", function (snapshot) {
      var coach = snapshot.val();

      $("#name").text(coach.name);
      $("#age").text(coach.age);
      $("#lisence").text(coach.lisence);
      $("#description").text(coach.description);
      $("#picture").attr("src", coach.url);

      // $book = $("#book");
      // $full = $("#full");
      // $book.hide();
      // $full.hide();
      // if (coach.count > 0) {
      //   $book.show();
      // } else {
      //   $full.show();
      // }

      $(document).on("click", "#book", function () {
        var date = $('#date').val();
        (async () => {
          const result = await bookCoach(user.uid, coachId, date)
          alert('The coach is booked')
        })().catch(err => {
          console.error(err);
        });
        // var result = await bookCoach(user.uid, coachId, date)

      });
    });
  });
});

function getCoachId() {
  var params = new URLSearchParams(window.location.search);
  var coachId = params.get("id");

  return coachId;
}

async function bookCoach(userId, coachId, date) {
  var bookingDateRef = firebase.database().ref("bookingDate");
  var bookingDateItemRef = bookingDateRef.child(userId).child(coachId);

  return await bookingDateItemRef.set(date);
}
