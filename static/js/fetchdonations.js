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
  const donationsCollection = collection(db, 'donations'); 
  const needsCollection = collection(db, 'needs'); 




  const donationsPromise = getDocs(donationsCollection)
  .then(snapshot => {
      const donations = [];
      snapshot.docs.forEach(doc => {
          donations.push({ ...doc.data(), id: doc.id });
      });
      return donations;
  })
  .catch(error => {
      console.error('Error fetching donations:', error);
  });

const needsPromise = getDocs(needsCollection)
  .then(snapshot => {
      const needs = [];
      snapshot.docs.forEach(doc => {
          needs.push({ ...doc.data(), id: doc.id });
      });
      return needs;
  })
  .catch(error => {
      console.error('Error fetching needs:', error);
  });

// Execute both promises concurrently
Promise.all([donationsPromise, needsPromise])
  .then(([donations, needs]) => {
      console.log("Donations:", donations);
      console.log("Needs:", needs);
      sessionStorage.setItem('donations', JSON.stringify(donations)); // Store donations data in session storage
      sessionStorage.setItem('needs', JSON.stringify(needs)); // Store needs data in session storage
      window.location.href = '/viewmap'; // Redirect to viewmap page
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });

    