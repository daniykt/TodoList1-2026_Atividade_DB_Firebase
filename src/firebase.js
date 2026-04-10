import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC1WzpgtDkCD93syvnZjownlCJ_SAg1TiY",

  authDomain: "atividade-danilo-27-03-db.firebaseapp.com",

  projectId: "atividade-danilo-27-03-db",

  storageBucket: "atividade-danilo-27-03-db.firebasestorage.app",

  messagingSenderId: "674696802624",

  appId: "1:674696802624:web:cbdfdda5eae576c9794aa5"

}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)