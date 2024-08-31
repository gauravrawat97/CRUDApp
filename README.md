
![Sample Video](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif%5D%28https://github.com/gauravrawat97/CRUDApp/blob/master/app/assets/demo.gif)


**Library Used:**

 - React-native-sqlite-storage
 - React-navigation
 - react-native-firebase/auth

Also used Firebase Function to access Registered users list from firebase.

Please note that the github project would require you to use your own firebase account.

*To make it workable please connect the app to firebase and download the json files for the corresponding platform (ios: GoogleServiceInfo.plist,android: google-service.json)*

Also you would require to create a Firebase Function.


*Please find the function below and upload it to Firebase*

    const functions = require("firebase-functions");
    const admin = require("firebase-admin");
    admin.initializeApp();
    
    exports.listUsers = functions.https.onRequest(async (req, res) => {
      try {
        const listUsersResult = await admin.auth().listUsers();
        res.json(listUsersResult.users);
      } catch (error) {
        res.status(500).send("Error listing users: " + error.message);
      }
    });




