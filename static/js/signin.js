
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
  import { getFirestore, collection,getDocs, setDoc,addDoc} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDBdapLHsJ9DMTW-GieApGtdUcjue8EjYc",
    authDomain: "testapp-7db68.firebaseapp.com",
    projectId: "testapp-7db68",
    storageBucket: "testapp-7db68.appspot.com",
    messagingSenderId: "949307014461",
    appId: "1:949307014461:web:0965acfe35a98b33285954",
    measurementId: "G-23VMX0VE7N"
   //
  };

  // Initialize Firebase
 
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const usersCollectionRef = collection(db, 'users');
  const analytics = getAnalytics(app);

const auth = getAuth(); 



document.getElementById("login").addEventListener("click", function() {
  var email =  document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    alert(user.email + " Login successfully!!!");

    // Fetch all user documents from Firestore
    const db = getFirestore();
    const usersRef = collection(db, 'users');

    getDocs(usersRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === user.uid) {
            const userType = doc.data().userType;

            // Send user ID, login status, and user type to server
            fetch('/loginsess', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userId: user.uid, isLoggedIn: true, userType: userType})
            })
            .then(response => {
              if (response.ok) {
                // Redirect to index page upon successful login
                window.location.href = "/";
              } else {
                throw new Error('Login failed');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Login failed');
            });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        alert('Login failed');
      });
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });               
});


// document.getElementById("logout").addEventListener("click", function() {
//   signOut(auth).then(() => {
//       console.log('Sign-out successful.');
//       alert('Sign-out successful.');
//       document.getElementById('logout').style.display = 'none';
//     }).catch(() => {
//       console.log('An error happened.');
//     });               
// });
