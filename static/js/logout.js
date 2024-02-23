
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

document.addEventListener("DOMContentLoaded", function() {
  // Find the logout link element by its ID
  var logoutLink = document.getElementById("logoutLink");

  // Add event listener to the logout link
  logoutLink.addEventListener("click", function(event) {
      // Prevent the default behavior of the link (i.e., navigating to the href)
      event.preventDefault();

      // Call the handleLogout() function when the logout link is clicked
      handleLogout();
  });
});

function handleLogout() {
  signOut(auth).then(() => {
      console.log('Sign-out successful.');
      alert('Logout-out successful.');

      // Make a call to /logoutsess endpoint after successful signout
      fetch('/logoutsess', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
            window.location.href='/';
          } else {
              throw new Error('Logout session failed.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }).catch(() => {
      console.log('An error happened.');
  });
}

