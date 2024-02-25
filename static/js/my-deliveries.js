
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
  const needsCollection = collection(db, 'needs');
  const usersRef = collection(db, 'users');
  const user_id = document.getElementById('user_id').value;
  console.log(user_id);
  getDocs(usersRef)
    .then((querySnapshot) => {
      const userEventsPromises = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === user_id) {
          // Query events collection for events created by this user
          const userEventsQuery = query(needsCollection, where("deliveredby", "==", user_id));
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
function createEventCard(need) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
  
    console.log("Need:", need);
  
    if (need && need.needType && need.beneficiaryName && need.beneficiaryLocation && need.beneficiaryMobileNo && need.needDetails && need.needStatus === "Not Delivered") {
      const type = document.createElement('h2');
      type.textContent = need.needType;
      eventDiv.appendChild(type);
  
      const name = document.createElement('p');
      name.textContent = `Beneficiary: ${need.beneficiaryName}`;
      eventDiv.appendChild(name);
  
      const location = document.createElement('p');
      location.textContent = `Location: ${need.beneficiaryLocation}`;
      eventDiv.appendChild(location);
  
      const mobileNo = document.createElement('p');
      mobileNo.textContent = `Mobile No: ${need.beneficiaryMobileNo}`;
      eventDiv.appendChild(mobileNo);
  
      const details = document.createElement('p');
      details.textContent = `Details: ${need.needDetails.description}, Quantity: ${need.needDetails.quantity}`;
      eventDiv.appendChild(details);
  
    //   // Button to mark as delivered
    //   const markDeliveredBtn = document.createElement('button');
    //   markDeliveredBtn.textContent = 'Mark as Delivered';
    //   markDeliveredBtn.addEventListener('click', () => markAsDelivered(need.id)); // Call function to mark as delivered when clicked
    //   eventDiv.appendChild(markDeliveredBtn);
      
      // Assigning different background color
      const colors = ['#8EACCD', '#D7E5CA', '#F9F3CC', '#D2E0FB']; // Add more colors as needed
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      eventDiv.style.backgroundColor = randomColor;
    } else {
      console.error("Need data is invalid or already delivered:", need);
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



