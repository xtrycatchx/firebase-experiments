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

let refOne = firebase.database().ref(config.databaseRootOne);

//look for something
refOne.orderByChild(config.fieldOne).equalTo(bloodType).once("value", childrenSnapshot => {
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

let data = {
    aaa : "TAG",
    bbb : "LENGTH",
    ccc : "VALUE"
}

let refTwo = firebase.database().ref(config.databaseRootTwo);

//look and update
refTwo.orderByChild("aaa").equalTo("TAG").once("value", childrenSnapshot => {
    childrenSnapshot.forEach(snapshot => {
        const key = snapshot.key;
        const aaa = snapshot.child("aaa").val();
        const bbb = snapshot.child("bbb").val();
        const ccc = snapshot.child("ccc").val();
        console.log(key, " >>>> ", aaa, bbb, ccc);
        const candidate = snapshot.child("bbb").val();
        if (candidate === locationOfDonor) {
            firebase.database().ref(config.databaseRootTwo).child(key).child("aaa").set("tuara");
        }
    });
});

//insert twice
refTwo.push(data);
refTwo.push(data);

