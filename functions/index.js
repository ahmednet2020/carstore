const functions = require('firebase-functions');
const admin = require("firebase-admin");
const token = "BLg0aCteMfSFAGtwnYmvJONFdOoR4E5AVeSqndDws7-gP3IOlDrUXPRwoi2FlhhyVtEET0wyarhcsre6UNjqIzo"
admin.initializeApp(functions.config().firebase);

exports.Notification = functions.firestore.document('Notification/{projectId}').onCreate((doc) => {
    const notification = doc.data();
    return admin.messaging().send({"data":notification,"token":notification.token})
	  .then((response) => {
	    console.log('Successfully sent message:', response);
	  })
	  .catch((error) => {
	    console.log('Error sending message:', error);
	  });
})
