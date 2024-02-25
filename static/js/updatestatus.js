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
const usersRef = collection(db, 'users');
const userType = document.getElementById('user_id').value;
// Add event listeners to all "Mark as Delivered" buttons
// Add event listeners to all "Mark as Delivered" buttons
const markAsDeliveredButtons = document.querySelectorAll('.mark-as-delivered');
markAsDeliveredButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const itemId = event.target.dataset.itemId; // Get the ID of the item from the button's dataset
        const userType = document.getElementById('userType').value; // Get the user type from the hidden input field
        const collectionName = userType === "donor" ? "donations" : "needs"; // Determine the collection based on user type
        const docRef = doc(db, collectionName, itemId);

        const deliveredBy = "Some Volunteer"; // Change this to the actual name or ID of the volunteer who delivered

        // Update the document in Firestore
        updateDoc(docRef, {
            needStatus: "Delivered", // Update the status to "Delivered"
            deliveredBy: deliveredBy // Add the deliveredBy field
        })
        .then(() => {
            console.log("Item marked as delivered successfully.");
            // You may want to update the UI or perform other actions after marking as delivered
        })
        .catch((error) => {
            console.error("Error marking item as delivered: ", error);
        });
    });
});
