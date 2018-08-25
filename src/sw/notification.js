import firebase from 'firebase/app';
import 'firebase/messaging';

import firebaseConfig from '../configs/firebase.conf.js';

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    console.log('setBackgroundMessageHandler ', payload);
    const {data} = payload;
    // Customize notification here
    var notificationTitle = data.title;
    var notificationOptions = {
        body: data.body,
        icon: data.icon
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (e) => {
    console.log('notification clicked', e);
    e.notification.close();

    e.waitUntil(
        clients.matchAll({includeUncontrolled: true, type: 'window'}).then((windowClients) => {
            var targetClient = windowClients[0];
            targetClient.focus && targetClient.focus();
        })
    );
});