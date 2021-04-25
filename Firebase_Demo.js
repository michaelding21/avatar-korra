var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create a database reference
var db = admin.firestore();


let adaRef = db.collection('users').doc('alovelace');

let setAda = adaRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

var aTuringRef = db.collection('users').doc('aturing');

var setAlan = aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});

db.collection('users').get()
  .then(function(snapshot){
    snapshot.forEach(function(doc){
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(function(err){
    console.log('Error getting documents', err);
  });
