import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  //firebase config
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);