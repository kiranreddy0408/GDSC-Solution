
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

const eventsCollection = collection(db, 'events');

// Selecting the form
const eventForm = document.getElementById('eventForm');

// Adding event listener to the form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Getting form input values
    const eventName = eventForm.eventName.value;
    const eventVenue = eventForm.search_input.value;
    const eventDate = eventForm.eventDate.value;
    const eventStartTime = eventForm.eventStartTime.value;
    const eventEndTime = eventForm.eventEndTime.value;
    const eventRegistrationLink = eventForm.eventRegistrationLink.value;
    const eventDescription = eventForm.eventDescription.value;
    const uid = user_id.value; // Assuming user_id is defined elsewhere

    // Concatenate start time with its period
    const eventTime = eventStartTime + ' - ' + eventEndTime ;

    // Add data to Firestore
    addDoc(collection(db, "events"), {
        uid: uid,
        eventName: eventName,
        eventVenue: eventVenue,
        eventDate: eventDate,
        eventTime: eventTime,
        eventRegistrationLink: eventRegistrationLink,
        eventDescription: eventDescription,
        // createdAt: firebase.firestore.FieldValue.serverTimestamp() // Include a timestamp
    })
    .then((docRef) => {
        console.log("Event added with ID: ", docRef.id);
        eventForm.reset(); // Reset the form after successful submission
    })
    .catch((error) => {
        console.error("Error adding event: ", error);
    });
});
