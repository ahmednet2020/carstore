const functions = require('firebase-functions');
const admin = require("firebase-admin");
const token = "BLg0aCteMfSFAGtwnYmvJONFdOoR4E5AVeSqndDws7-gP3IOlDrUXPRwoi2FlhhyVtEET0wyarhcsre6UNjqIzo"
admin.initializeApp(functions.config().firebase);

exports.Notification = functions.firestore.document('Notification/{projectId}').onCreate((doc) => {
    const notification = doc.data();
    return admin.firestore().collection("FCMkeys").get().then(snapshot => {
    	snapshot.docs.forEach((doc) => {
    		let token = doc.data().token
	    	return admin.messaging().send({"data":notification,"token":token})
			.then((response) => {
				console.log('Successfully sent message:', response);
			})
			.catch((error) => {
				console.log('Error sending message:', error);
			});
    	})
    })
    .catch((error) => {
		console.log('Error get data:', error);
	});
})
