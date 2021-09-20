const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addLike = functions.firestore
	.document("/posts/{creator_id}/userPosts/{post_id}/likes/{user_id}")
	.onCreate((_, context) => {
		return db
			.collection("posts")
			.doc(context.params.creator_id)
			.collection("userPosts")
			.doc(context.params.post_id)
			.update({
				likesCount: admin.firestore.FieldValue.increment(1),
			});
	});

exports.removeLike = functions.firestore
	.document("/posts/{creator_id}/userPosts/{post_id}/likes/{user_id}")
	.onDelete((_, context) => {
		return db
			.collection("posts")
			.doc(context.params.creator_id)
			.collection("userPosts")
			.doc(context.params.post_id)
			.update({
				likesCount: admin.firestore.FieldValue.increment(-1),
			});
	});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
