import * as firebase from 'firebase'  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmBDX5iwKoQG52DhUC1sg8-XRgQV2MvzI",
    authDomain: "employess123.firebaseapp.com",
    databaseURL: "https://employess123.firebaseio.com",
    projectId: "employess123",
    storageBucket: "",
    messagingSenderId: "727354818740"
  };
  firebase.initializeApp(config);
  export const ManagementData =firebase.database().ref('EmployeesForData/')
// xem dữ liệu trong firebase  
//  ManagementData.once('value').then(function(snapshot){
//     console.log(snapshot.val());
//     })