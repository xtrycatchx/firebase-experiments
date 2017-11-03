'use strict';
const firebase = require("firebase-admin");

const secret = require("./secret.json");
const config = require("./config.json")

firebase.initializeApp({
    credential: firebase.credential.cert(secret),
    databaseURL: config.databaseURL
});

const bloodType = "o+"
const locationOfDonor = "cebu";

let ref = firebase.database().ref(config.databaseRoot);

ref.orderByChild(config.fieldOne).equalTo(bloodType).once("value", childrenSnapshot => {
    childrenSnapshot.forEach(snapshot => {
        const recipient = snapshot.key;
        const anotherField = snapshot.child(config.fieldTwo).val();
        if (!anotherField) {
            console.log("X > ", bloodType, recipient, anotherField);
        } else {
            console.log("Z > ", bloodType, recipient, anotherField);
        }
    });
});
