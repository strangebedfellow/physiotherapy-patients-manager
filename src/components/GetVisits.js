import React, { Component } from "react";
import * as firebase from 'firebase';

const GetVisits = (id) => {
    const rootRef = firebase.database().ref("patients").child(id).child("visits");
        rootRef.on('value', snap => {
            const visits = [];
            snap.forEach((childSnap) => {
                visits.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
      console.log(visits)
      return visits
        })
        
}

export default GetVisits