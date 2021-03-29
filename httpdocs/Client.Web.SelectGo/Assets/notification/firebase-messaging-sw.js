importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
  var firebaseConfig = {
    apiKey: "AIzaSyBam42gf2cdDEDMZOON0ZFz-H9d5R7AXrs",
    authDomain: "selectgo-b70cb.firebaseapp.com",
    databaseURL: "https://selectgo-b70cb.firebaseio.com",
    projectId: "selectgo-b70cb",
    storageBucket: "selectgo-b70cb.appspot.com",
    messagingSenderId: "367404033006",
    appId: "1:367404033006:web:33a83b198f72e1f140e4ff",
    measurementId: "G-QBEM6DC3MF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
