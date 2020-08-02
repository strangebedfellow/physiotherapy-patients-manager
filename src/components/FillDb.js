import React, { Component } from "react";
import * as firebase from 'firebase';

const FillDb = (id) => {
    console.log('fill');
    const rootRef = firebase.database().ref('patients').child(id).child("visits");
        rootRef.push({
            "case" : "no_case",
            "date" : "2020.07.22",
            "interview": {
                "iq1": "opis",
                "iq2": "objawy",
                "iq3": "charakter bólu"
              }
    })
}

export default FillDb