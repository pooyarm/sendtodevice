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
		
		// Get user profile, list of device tokens are there.
		
		const userProfile = await admin.firestore()
			.doc(`/profile/${userId}`).get();
		
		const tokensRef = admin.firestore()
				.collection(`/users/${userId}/tokens`);
		const tokens = await tokensRef.get();
		
		if (!tokens) return true;

		console.log('tokens',tokens.docs);

		var tokenArray = [];
		tokens.forEach(token => {
			tokenArray.push(token.data().token);
		});

		const payload = {
			data: {
				title: 'Arrived at your device!',
				body: data.text,
				icon: userProfile.get('avatarUrl') || null
			}
		};

		var response = await admin.messaging().sendToDevice(tokenArray, payload);
		// For each message check if there was an error.
		const tokensToRemove = [];
		response.results.forEach((result, index) => {
			const error = result.error;
			if (error) {
				console.error('Failure sending notification to', tokens.docs[index], error);
				// Cleanup the tokens who are not registered anymore.
				if (error.code === 'messaging/invalid-registration-token' ||
					error.code === 'messaging/registration-token-not-registered') {
					tokensToRemove.push(tokens.docs[index].delete());
				}
			}
		});
		return Promise.all(tokensToRemove);
	});