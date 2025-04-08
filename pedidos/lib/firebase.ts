import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase solo en el cliente
const app = typeof window !== "undefined" ? initializeApp(firebaseConfig) : null

// Exportar servicios de Firebase
export const db = typeof window !== "undefined" ? getFirestore(app!) : null
export const auth = typeof window !== "undefined" ? getAuth(app!) : null
export const storage = typeof window !== "undefined" ? getStorage(app!) : null

// Función para verificar si Firebase está inicializado
export const isFirebaseInitialized = () => {
  return !!app
}
