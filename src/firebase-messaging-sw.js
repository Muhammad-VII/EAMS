importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCPU5Y-G14q64ENzOJTcwzX3FR2KFYaBx0",
    authDomain: "eams-app.firebaseapp.com",
    projectId: "eams-app",
    storageBucket: "eams-app.appspot.com",
    messagingSenderId: "359175411857",
    appId: "1:359175411857:web:1be137f155440b2ca3c730",
    measurementId: "G-SBCQ57B6GJ",
    databaseURL: 'https://eams-app-default-rtdb.firebaseio.com', 
    locationId: 'us-central'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();