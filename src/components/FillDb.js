import * as firebase from 'firebase';

//testing db ref for push()
// for now adds new visit with below data
//#############to change: open modal with inputs to add new visit

const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let dateObj = new Date();
let month = monthNames[dateObj.getMonth()];
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();
let currentDate = year + '.' + month + '.' + day;

const FillDb = (id) => {
    console.log(currentDate)
    const rootRef = firebase.database().ref('patients').child(id).child("visits");
    rootRef.push({
        "case": "no_case",
        "date": currentDate
    })
}

export default FillDb