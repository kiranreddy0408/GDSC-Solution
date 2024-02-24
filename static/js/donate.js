
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
  const donationsCollection = collection(db, 'donations'); // Reference to the donations collection

  // Selecting the form
  const donationForm = document.getElementById('donationForm');
  const user_id= document.getElementById('user_id');
  
  // Adding event listener to the form submission
  donationForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission behavior
  
      // Getting form input values
      const donorName = donationForm.donorName.value;
      const donorMobileNo = donationForm.donorMobileNo.value; // Changed from 'donorNumber' to 'donorMobileNo'
      const donorLocation = donationForm.donorLocation.value;
      const donationType = donationForm.donationType.value;
      const uid = user_id.value;
      console.log(uid);
  
      // Depending on the selected donation type, extract additional form input values
      let donationDetails = {};
      switch(donationType) {
          case 'food':
              donationDetails = {
                  type: donationForm.foodType.value,
                  expiry: donationForm.foodExpiry.value,
                  quantity: donationForm.foodQuantity.value,
                  description: donationForm.foodDescription.value
              };
              break;
          case 'clothes':
              donationDetails = {
                  size: donationForm.clothesSize.value,
                  type: donationForm.clothesType.value
              };
              break;
          case 'books':
              donationDetails = {
                  bookType: donationForm.bookType.value,
                  Quantity: donationForm.bookQuantity.value
              };
              break;
          case 'fund':
              donationDetails = {
                  type: donationForm.fundType.value,
                  description: donationForm.fundDescription.value
              };
              break;
          case 'other':
              donationDetails = {
                  otherDetails: donationForm.otherDetails.value
              };
              break;
          default:
              break;
      }
  
      // Add data to Firestore
      addDoc(donationsCollection, {
          donorName: donorName,
          donorMobileNo: donorMobileNo, 
          donorLocation: donorLocation,
          donationType: donationType,
          donationDetails: donationDetails,
          donationStatus:"Not Delivered",
          uid:uid
          
          // createdAt: firebase.firestore.FieldValue.serverTimestamp() // Include a timestamp
      })
      .then((docRef) => {
          console.log("Donation added with ID: ", docRef.id);
          donationForm.reset(); // Reset the form after successful submission
      })
      .catch((error) => {
          console.error("Error adding donation: ", error);
      });
  });
  