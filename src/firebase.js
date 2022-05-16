import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7lsUr_4CmV1IMLOD7KnJ4VAAI-vP_PFk",
  authDomain: "cents-98344.firebaseapp.com",
  projectId: "cents-98344",
  storageBucket: "cents-98344.appspot.com",
  messagingSenderId: "227435206780",
  appId: "1:227435206780:web:e33328dc8b946f3dae11f9",
  measurementId: "G-B2LTMSS0KZ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore()