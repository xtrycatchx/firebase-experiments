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
        if (!snapshot.child(config.fieldTwo).val()) {
            console.log("X > ", bloodType, recipient, snapshot.child(config.fieldTwo).val());
        } else {
            console.log("Z > ", bloodType, recipient, snapshot.child(config.fieldTwo).val());
        }
    });
});
