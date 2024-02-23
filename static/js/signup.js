
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


document.getElementById("register").addEventListener("click", function() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  var address = document.getElementById("address").value;
  var mobileNo = document.getElementById("mobileNo").value;
  var userType = document.querySelector('input[name="userType"]:checked').value;

  if (!email || !password || !username || !address || !mobileNo || !userType) {
      alert("Please fill in all required fields.");
      return;
  }

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          alert("Registration successful!");

          addDoc(collection(db, "users"), {
              uid: userCredential.user.uid,
              email: email,
              username: username,
              address: address,
              mobileNo: mobileNo,
              userType: userType, // Include userType in the document
          })
          .then((docRef) => {
              console.log("User document written with ID:", docRef.id);
              // Redirect to the login page after successful registration
              window.location.href = "signin";
          })
          .catch((error) => {
              console.error("Error adding user data to Firestore:", error);
              alert("An error occurred while storing user data. Please try again later.");
          });
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user:", errorMessage);
          alert("Registration failed: " + errorMessage);
      });
});

