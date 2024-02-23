
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

  // Reference to the events collection
  const eventsCollection = collection(db, 'events');


  getDocs(eventsCollection)
  .then((snapshot) => {
    var events = [];
    snapshot.docs.forEach((doc) => {
      events.push({ ...doc.data(), id: doc.id });
    });
    console.log(events);
    renderEvents(events); // Pass the events array to the renderEvents function
  });

// Function to create event card HTML element
function createEventCard(event) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
  
    console.log("Event:", event);
  
    if (event && event.eventName && event.eventVenue && event.eventDate && event.eventTime && event.eventDescription && event.eventRegistrationLink) {
      const name = document.createElement('h2');
      name.textContent = event.eventName;
      eventDiv.appendChild(name);
  
      const venue = document.createElement('p');
      venue.textContent = `Venue: ${event.eventVenue}`;
      eventDiv.appendChild(venue);
  
      const dateTime = document.createElement('p');
      dateTime.textContent = `Date: ${event.eventDate} - Time: ${event.eventTime}`;
      eventDiv.appendChild(dateTime);
  
      const description = document.createElement('p');
      description.textContent = event.eventDescription.length > 50 ? event.eventDescription.substring(0, 50) + '...' : event.eventDescription;
      eventDiv.appendChild(description);
  
      const registerBtn = document.createElement('a');
      registerBtn.href = event.eventRegistrationLink;
      registerBtn.classList.add('btn');
      registerBtn.textContent = 'Register';
      eventDiv.appendChild(registerBtn);
      
      // Assigning different background color
      const colors = ['#8EACCD', '#D7E5CA', '#F9F3CC', '#D2E0FB']; // Add more colors as needed
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      eventDiv.style.backgroundColor = randomColor;
    } else {
      console.error("Event data is invalid:", event);
    }
  
    return eventDiv;
  }
  
  function renderEvents(events) {
    const eventsContainer = document.getElementById('eventsContainer');
    
    // Check if events is an array
    if (Array.isArray(events)) {
        eventsContainer.innerHTML = ''; // Clear existing content

        events.forEach((event) => {
            const eventCard = createEventCard(event);
            eventsContainer.appendChild(eventCard);
        });
    } else {
        console.error("Events data is not an array:", events);
    }
}

