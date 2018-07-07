$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdz2Q4if_BfZQP0xRvFsqpyfzUE7TcjKQ",
    authDomain: "bike-finder-project.firebaseapp.com",
    databaseURL: "https://bike-finder-project.firebaseio.com",
    projectId: "bike-finder-project",
    storageBucket: "bike-finder-project.appspot.com",
    messagingSenderId: "630877659629"
  };
firebase.initializeApp(config);

// Create a variable to reference the database.
    var database = firebase.database();
//Listen for new added users
database.ref().on("child_added", function(snapshot) {
var snapValue = snapshot.val();
var seconds = snapValue.dateAdded;
var d = new Date(0);
d.setUTCSeconds(seconds);
console.log(d);
$("#data-area").append(`
<div class="lost-bike">
<p>${snapValue.make}</p>
<p>${snapValue.model}</p>
<p>${snapValue.color}</p>
<p>${snapValue.age}</p>
<p>${snapValue.size}</p>
<p>${snapValue.license}</p>
<p>${snapValue.serial}</p>
<hr />
</div>
`)
});
// Initial Values
    var make = "";
    var model = "";
    var color = "";
    var age = "";
    var size = "";
    var license = "";
    var serial = "";


// Capture Button Click
$("#add-user").on("click", function(event) {
    event.preventDefault();
    // Grabbed values from text boxes
    make = $("#make-input").val().trim();
    model = $("#model-input").val().trim();
    color = $("#color-input").val().trim();
    age = $("#age-input").val().trim();
    size = $("#size-input").val().trim();
    license = $("#license-input").val().trim();
    serial = $("#serial-input").val().trim();

    // Code for handling the push
    database.ref().push({
        
      make: make,
      model: model,
      color: color,
      age:age,
      size: size,
      license: license,
      serial: serial,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
  });
});