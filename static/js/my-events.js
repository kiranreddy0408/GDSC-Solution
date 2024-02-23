
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
  import { getFirestore, collection,getDocs,query, where, setDoc,addDoc} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
  const usersRef = collection(db, 'users');
  const user_id = document.getElementById('user_id').value;
  console.log(user_id);
  getDocs(usersRef)
    .then((querySnapshot) => {
      const userEventsPromises = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === user_id) {
          // Query events collection for events created by this user
          const userEventsQuery = query(eventsCollection, where("uid", "==", user_id));
          userEventsPromises.push(getDocs(userEventsQuery));
        }
      });
      // Resolve all promises for user's events
      return Promise.all(userEventsPromises);
    })
    .then((userEventsSnapshots) => {
      // Concatenate all user's events from different snapshots
      const userEvents = [];
      userEventsSnapshots.forEach((snapshot) => {
        snapshot.docs.forEach((doc) => {
          userEvents.push({ ...doc.data(), id: doc.id });
        });
      });
      console.log(userEvents);
      renderEvents(userEvents); // Pass the user's events array to the renderEvents function
    })
    .catch((error) => {
      console.error("Error getting user events: ", error);
    });
// Function to create event card HTML element
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
      
      // Edit icon
      const editIcon = document.createElement('i');
      editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
      editIcon.addEventListener('click', () => showEditForm(event)); // Show edit form when clicked
      eventDiv.appendChild(editIcon);
      
      // Assigning different background color
      const colors = ['#8EACCD', '#D7E5CA', '#F9F3CC', '#D2E0FB']; // Add more colors as needed
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      eventDiv.style.backgroundColor = randomColor;
    } else {
      console.error("Event data is invalid:", event);
    }
  
    return eventDiv;
}

// Function to show edit form with existing values pre-filled
function showEditForm(event) {
    // Populate the edit form fields with existing event data
    document.getElementById('editEventName').value = event.eventName;
    document.getElementById('editEventVenue').value = event.eventVenue;
    document.getElementById('editEventDate').value = event.eventDate;
    document.getElementById('editEventTime').value = event.eventTime;
    document.getElementById('editEventDescription').value = event.eventDescription;
    document.getElementById('editEventRegistrationLink').value = event.eventRegistrationLink;
    
    // Show the edit form
    document.getElementById('editFormContainer').style.display = 'block';
}

// Function to update the event in the database
function updateEventInDatabase(eventId, eventData) {
    const eventDocRef = doc(db, 'events', eventId);
    return updateDoc(eventDocRef, eventData);
}

// Event listener for the edit form submission
document.getElementById('editEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const eventId = document.getElementById('editEventId').value;
    const eventData = {
        eventName: document.getElementById('editEventName').value,
        eventVenue: document.getElementById('editEventVenue').value,
        eventDate: document.getElementById('editEventDate').value,
        eventTime: document.getElementById('editEventTime').value,
        eventDescription: document.getElementById('editEventDescription').value,
        eventRegistrationLink: document.getElementById('editEventRegistrationLink').value
    };
    
    try {
        await updateEventInDatabase(eventId, eventData);
        // Close edit form after successful update
        document.getElementById('editFormContainer').style.display = 'none';
        // Refresh my events
        refreshMyEvents();
    } catch (error) {
        console.error("Error updating event:", error);
    }
});

// Function to refresh "My Events" view
function refreshMyEvents() {
    // You need to implement this function according to your application's logic
    // It should re-fetch and re-render the events belonging to the current user
    // For example, you can re-run the query to fetch user's events and then render them again
}

// Close edit form when cancel button is clicked
document.getElementById('editCancelButton').addEventListener('click', () => {
    document.getElementById('editFormContainer').style.display = 'none';
});

// Function to render events
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
