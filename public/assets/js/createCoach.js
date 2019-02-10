$(function() {
  // 1. 取得商品資料
  $("#createCoach").on("submit", function(e) {
    e.preventDefault();

    var key = createCoachKey();

    var picture = $("#picture").get(0).files[0];
    var coachImageRef = firebase
      .storage()
      .ref("coachImages/" + key)
      .child(picture.name);

    coachImageRef.put(picture).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        var coach = {
          name: $("#name").val(),
          age: +$("#age").val(),
          lisence: $("#lisence").val(),
          description: $("#description").val(),
          url: url
        };
        console.log(coach);
        createCoach(key, coach);
      });
    });
  });
});

function createCoachKey() {
  var database = firebase.database();
  var coachRef = database.ref("coaches");
  var key = coachRef.push().key;

  return key;
}

function createCoach(key, coach) {
  var database = firebase.database();
  var coachRef = database.ref("coaches");

  coachRef.child(key).set(coach)
  .then(function() {
    alert('Update succeeded');
  })
  .catch(function(error) {
    alert('Update failed');
  });
;
}
