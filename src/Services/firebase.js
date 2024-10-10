import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyANA-4mx08ddhXMH9eK_iTvITHTLM_68SM",
    authDomain: "chat-app-c369c.firebaseapp.com",
    projectId: "chat-app-c369c",
    storageBucket: "chat-app-c369c.appspot.com",
    messagingSenderId: "327100170517",
    appId: "1:327100170517:web:49d56b93baf1158781a91c"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const databaseApp = getFirestore(app); 
  
 
  export { auth, provider, databaseApp };