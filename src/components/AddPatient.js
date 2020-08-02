import React, { Component } from "react";
import * as firebase from 'firebase';

const AddPatient = (id) => {
    console.log('add!!!');
    const rootRef = firebase.database().ref('patients');
        rootRef.push({
            "age" : 33,
            "name" : "Nowy",
            "surname" : "Pacjent",
            "occupation" : "Strażak",
            "email" : "strazak@sam",
            "phone_number" : "999"
    })
}

export default AddPatient