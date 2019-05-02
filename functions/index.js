const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Notification function 
// this function fire if add new document in firestore Notification collection
// this Notification collection can be add from api or from firebase console
exports.Notification = functions.firestore.document('Notification/{projectId}').onCreate((doc) => {
	// get data new Notification
    const notification = doc.data();
    // get all FCM token from firestore collection to send Notification to all client
    // you shoud have is database for clients need Notification 
    return admin.firestore().collection("FCMkeys").get().then(snapshot => {
    	snapshot.docs.forEach((doc) => {
    		// loop FCM token and send messaging to every clint
    		let token = doc.data().token
    		// send Notification
    		// must me like this object
    		let Notification = {
    			"data":notification, // require 
    			"token":token // require
    		}
	    	return admin.messaging().send(Notification)
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
