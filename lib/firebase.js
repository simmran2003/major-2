import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore" // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyACvKFNS6Ztv1BjjETnUzGPFolVZumgsGY",
  authDomain: "ai-interview-3df30.firebaseapp.com",
  projectId: "ai-interview-3df30",
  storageBucket: "ai-interview-3df30.appspot.com",
  messagingSenderId: "493731625756",
  appId: "1:493731625756:web:16df70a6d7747da41c58d9",
  measurementId: "G-CBQ3485V7R",
  databaseURL: "https://ai-interview-3df30-default-rtdb.firebaseio.com",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage(app)
const db = getFirestore(app) // ✅

export { app, analytics, storage, db }
