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
 var map;
 var marker;
 var infowindow;
 var messagewindow;
 var lat = '';
 var lng = '';
 var value = '';
 var latlng = '';
 var baseImage;
 var NewToken;
 //  var childData = '';
 var contentWindow = '';
 var currentInfoWindow = null;
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

     var query = firebase.database().ref().orderByKey();
     query.once("value")
         .then(function (snapshot) {
             snapshot.forEach(function (childSnapshot) {
                 var childData = childSnapshot.val();
                 //  console.log("Child Data: ", childData)
                 lat = childData.latitude;
                 lng = childData.longitude;
                 //  showImage = childData.image;
                 //  console.log("key", key);
                 //  console.log("latlng = ", lat + ',' + lng);
                 marker = new google.maps.Marker({
                     position: {
                         lat: (parseFloat(lat)),
                         lng: (parseFloat(lng))
                     },
                     map: map,
                 });
                 google.maps.event.addListener(marker, 'click', function () {
                     var infoWindowDB = new google.maps.InfoWindow;
                     infoWindowDB.setContent('<div> Make: ' + childData.make + '<br>' + '</div><div> Model: ' + childData.model + '<br>' + '</div><div> Color: ' + childData.color + '<br>' + '</div><div> Year: ' + childData.age + '<br>' + '</div><div> Size: ' + childData.size + '<br></div>' + '</div><div> License: ' + childData.license + '<br>' + '</div><div> Serial: ' + childData.serial + '<br>' + '<img src="' + childData.image + '" style="height:200px"/>');
                     if (currentInfoWindow != null) {
                         currentInfoWindow.close();
                     }
                     //  infoWindowDB.open(map, marker);
                     currentInfoWindow = infoWindowDB;
                     infoWindowDB.open(map, this);

                 });

             });

         });


     // Create the DIV to hold the control and call the makeInfoBox() constructor
     // passing in this DIV.
     //  google.maps.event.addListener(marker, 'click', function () {
     //      infowindow.setContent('<div><strong>' + lat + '</strong><br>');
     //      infowindow.open(map, this);
     //  });
     function placeMarker(location) {
         if (marker) {
             marker.setPosition(location);
         } else {
             marker = new google.maps.Marker({
                 position: location,
                 map: map
             });
         }
     }
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
         placeMarker(event.latLng);

         google.maps.event.addListener(marker, 'click', function () {
             infowindow.open(map, marker);
             //  console.log(map);
             //  console.log(marker);
         });
     });
     google.maps.event.addListener(map, "click", function (e) {

         //lat and lng is available in e object
         latLng = e.latLng;
         lat = e.latLng.lat();
         lng = e.latLng.lng();

     });
 }

 function encodeImageFileAsURL(element) {
     var file = element.files[0];
     var reader = new FileReader();
     reader.onloadend = function () {
         baseImage = reader.result
         console.log('RESULT', reader.result)
     }
     reader.readAsDataURL(file);
 }



 function saveData() {
     // event.preventDefault();
     // Grabbed values from text boxes

     status = $('input[name=status-input]:checked').val();
     make = $("#make-input").val().trim();
     model = $("#model-input").val().trim();
     color = $("#color-input").val().trim();
     age = $("#age-input").val().trim();
     size = $("#size-input").val().trim();
     license = $("#license-input").val().trim();
     serial = $("#serial-input").val().trim();
     image = baseImage;
     token = newToken;
     //  console.log('status-val = ', status)

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
         token: token,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
     $('#form')
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

 function doNothing() {}

 //Listen for new added users
 database.ref().on("child_added", function (snapshot) {
     var snapValue = snapshot.val();
     var seconds = snapValue.dateAdded;
     var d = new Date(0);
     d.setUTCSeconds(seconds);
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

 function order() {
     var ref = firebase.database().ref();
     value = ref.orderByKey().on("child_added", function (snapshot) {

         snapshot.val();
         //  console.log(snapshot.val());
     });
 }
 order();

 var messaging = firebase.messaging();
 messaging.requestPermission()
     .then(function () {
         console.log('have permission');
         return messaging.getToken();
         console.log(messaging.getToken());
     })
     .then(function (token) {
         newToken = token
         console.log(newToken);
     })
     .catch(function (err) {
         console.log('error occured');
     })

 messaging.onMessage(function (payload) {
     console.log('onMessage: ', payload)
 })