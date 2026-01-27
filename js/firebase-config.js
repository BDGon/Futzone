// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TUS CREDENCIALES REALES DE FUTZONEAPP
const firebaseConfig = {
    apiKey: "AIzaSyAoN2RgPYpfnZ8OrkYZknyjHk5hDIIxkZA",
    authDomain: "futzoneapp-2de5e.firebaseapp.com",
    projectId: "futzoneapp-2de5e",
    storageBucket: "futzoneapp-2de5e.firebasestorage.app",
    messagingSenderId: "189245151382",
    appId: "1:189245151382:web:ba637ec21a363cac5d0ab7"
};

// Iniciamos todo el sistema
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);      // Para el Login
const db = getFirestore(app);   // Para los Turnos

// Exportamos para usar en los otros archivos
export { auth, db };
