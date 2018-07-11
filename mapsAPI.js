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

 var storageService = firebase.storage();
 var storageRef = storageService.ref();

 // Create a variable to reference the database.
 var database = firebase.database();
 var map;
 var marker;
 var infowindow;
 var messagewindow;
 var lat = '';
 var lng = '';
 var value = '';
 var latlng = '';

 // var data = {
 //     sender: null,
 //     timestamp: null,
 //     lat: null,
 //     lng: null
 // };
 // var firebase = new Firebase("https://bike-finder-project.firebaseio.com");

 database.ref().on("value", function (snapshot) {
     snapshot.forEach(function (childSnapshot) {
         var childData = childSnapshot.val();
         lat = childData.latitude;
         lng = childData.longitude;
         latlng = '{lat: ' + lat + ', lng: ' + lng + '}';
         console.log(latlng);
         console.log(parseFloat(lat));
         console.log(parseFloat(lng));
     });
 });

 function initMap() {

     var denver = {
         lat: 39.680429,
         lng: -104.965109,
         styles: [{
             featureType: 'poi',
             stylers: [{
                 visibility: 'off'
             }] // Turn off points of interest.
         }, {
             featureType: 'transit.station',
             stylers: [{
                 visibility: 'off'
             }] // Turn off bus stations, train stations, etc.
         }],
         disableDoubleClickZoom: true

     };
     map = new google.maps.Map(document.getElementById('map'), {
         center: denver,
         zoom: 13
     });
     var marker = new google.maps.Marker({
         position: {
             lat: parseFloat(lat),
             lng: parseFloat(lng)
         },
         map: map,
         title: 'Hello World!'

     });

     // Create the DIV to hold the control and call the makeInfoBox() constructor
     // passing in this DIV.
     infowindow = new google.maps.InfoWindow({
         content: document.getElementById('form')
     });

     messagewindow = new google.maps.InfoWindow({
         content: document.getElementById('message')
     });

     google.maps.event.addListener(map, 'click', function (event) {
         marker = new google.maps.Marker({
             position: event.latLng,
             map: map
         });


         google.maps.event.addListener(marker, 'click', function () {
             infowindow.open(map, marker);
             console.log(map);
             console.log(marker);
         });
     });
     google.maps.event.addListener(map, "click", function (e) {

         //lat and lng is available in e object
         latLng = e.latLng;
         lat = e.latLng.lat();
         lng = e.latLng.lng();
     });
 }


 function saveData() {
     // event.preventDefault();
     // Grabbed values from text boxes
     make = $("#make-input").val().trim();
     model = $("#model-input").val().trim();
     color = $("#color-input").val().trim();
     age = $("#age-input").val().trim();
     size = $("#size-input").val().trim();
     license = $("#license-input").val().trim();
     serial = $("#serial-input").val().trim();
     image = '';
     // database.ref().on("value", function (snapshot) {
     //     snapshot.forEach(function (childSnapshot) {
     //         var childData = childSnapshot.val();
     //         var id = childData.id;
     //         console.log(childData.id);
     //     });
     // });

     // Code for handling the push
     database.ref().push({
         make: make,
         model: model,
         color: color,
         age: age,
         size: size,
         license: license,
         serial: serial,
         status: status,
         image: image,
         latitude: lat,
         longitude: lng,
         dateAdded: firebase.database.ServerValue.TIMESTAMP

     });
 }

 function downloadUrl(url, callback) {
     var request = window.ActiveXObject ?
         new ActiveXObject('Microsoft.XMLHTTP') :
         new XMLHttpRequest;

     request.onreadystatechange = function () {
         if (request.readyState == 4) {
             request.onreadystatechange = doNothing;
             callback(request.responseText, request.status);
         }
     };

     request.open('GET', url, true);
     request.send(null);
 }




 //  function loadPointsFromFirebase(map) { // pass the initialised map to the function
 //      var marker = {};
 //      // var db = firebase.database();
 //      database.ref('click').on('value', points => {
 //          points.forEach(point => {
 //              marker = new google.maps.Marker({
 //                  map: map,
 //                  position: {
 //                      lat: lat,
 //                      lng: lng
 //                  }
 //              })
 //              marker.setMap(map) // Set market on the map 
 //          })
 //      })
 //  }


 function doNothing() {}

 //Listen for new added users
 database.ref().on("child_added", function (snapshot) {
     var snapValue = snapshot.val();
     var seconds = snapValue.dateAdded;
     var d = new Date(0);
     d.setUTCSeconds(seconds);
     console.log(d);
     //                 $("#data-area").append(
     //                     `
     // <div class="lost-bike">
     // <p>${snapValue.make}</p>
     // <p>${snapValue.model}</p>
     // <p>${snapValue.color}</p>
     // <p>${snapValue.age}</p>
     // <p>${snapValue.size}</p>
     // <p>${snapValue.license}</p>
     // <p>${snapValue.serial}</p>
     // <hr />
     // </div>
     // `
     // )
 });
 // Initial Values
 var make = "";
 var model = "";
 var color = "";
 var age = "";
 var size = "";
 var license = "";
 var serial = "";
 var status = "";


 var usersRef = firebase.database().ref('users').push();

 // Create a new GeoFire key under users Firebase location
 var geoFire = new GeoFire(database.ref().child('geofire'));

 // Capture Button Click
 $("#add-user").on("click", function (event) {
     // event.preventDefault();
     // Grabbed values from text boxes
     make = $("#make-input").val().trim();
     model = $("#model-input").val().trim();
     color = $("#color-input").val().trim();
     age = $("#age-input").val().trim();
     size = $("#size-input").val().trim();
     license = $("#license-input").val().trim();
     serial = $("#serial-input").val().trim();
     status = $("#status-input").val().trim();
     // map.addListener('click', function (e) {
     //     data.lat = e.latLng.lat();
     //     data.lng = e.latLng.lng();
     //     addToFirebase(data);
     //     console.log(e.latLng.lat());
     // });

     geoFire.set('testTest', [39.680429, -104.965109]).then(function () {
         console.log('Location added')
     }).catch(function (error) {
         console.log(error);
     });
     // Code for handling the push
     database.ref().push({

         make: make,
         model: model,
         color: color,
         age: age,
         size: size,
         license: license,
         serial: serial,
         status: status,
         dateAdded: firebase.database.ServerValue.TIMESTAMP,

     });

 });

 function order() {
     var ref = firebase.database().ref();
     value = ref.orderByKey().on("child_added", function (snapshot) {

         snapshot.val();
         console.log(snapshot.val());
     });
 }
 order();