importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js")

var config = {
    apiKey: "AIzaSyBdz2Q4if_BfZQP0xRvFsqpyfzUE7TcjKQ",
    authDomain: "bike-finder-project.firebaseapp.com",
    databaseURL: "https://bike-finder-project.firebaseio.com",
    projectId: "bike-finder-project",
    storageBucket: "bike-finder-project.appspot.com",
    messagingSenderId: "630877659629"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'Bike Found';
    const options = {
        body: payload.data.status
    }

    return self.registration.showNotification(title, options)
})