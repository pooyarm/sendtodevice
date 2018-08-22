const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';

const admin = require('firebase-admin');
admin.initializeApp();

const settings = {timestampsInSnapshots: true};
//functions.firestore.settings(settings);

exports.sendNotifications = 
	functions.firestore.document('users/{userId}/items/{itemId}').onCreate(async (snap, context) => {
	//.onWrite(async (change, context) => {
		const {userId, itemId} = context.params;
		const data = snap.data();
		
		console.log('started');
		console.log('context.params',context.params);
		console.log('data', data);
		
		// Get user profile, list of device tokens are there.
		
		const userProfile = await admin.firestore()
			.doc(`/profile/${userId}`).get();
		
		
		const tokens = userProfile.get('tokens');
		console.log('tokens', tokens);
		if (tokens.length === 0) return true;

		const payload = {
			notification: {
				title: 'Arrived at your device!',
				body: data.text,
				//icon: follower.photoURL
			}
		};

		var result = await admin.messaging().sendToDevice(tokens, payload);

		return true;
	});