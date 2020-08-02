import React, { Component } from "react";
import * as firebase from 'firebase';


const RootRef = () => {
    // const plug = firebase.database().ref().child('patients');
    // console.log(plug)

    const ref = firebase.database().ref("patients");
    ref.on("value")
        .then(function (snapshot) {
            const name = snapshot.child("-MDbCTk5xQAimpFDv_mN").val();
            console.log(name.name)
          
        });

    return null

}

export default RootRef;