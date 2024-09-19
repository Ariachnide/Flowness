import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAoQHc6aQeKEq7yOf2ndCJP5tIGwqFXu2A",
    authDomain: "flowness-ee103.firebaseapp.com",
    projectId: "flowness-ee103",
    storageBucket: "flowness-ee103.appspot.com",
    messagingSenderId: "741610289329",
    appId: "1:741610289329:web:3b8ad28c3c3d53e6c30a90",
    measurementId: "G-SZ7MPNJSMY"
};

window.addEventListener("load", () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const storage = getStorage(app);
    
    getDocs(collection(db, "BackgroundPictures"))
        .then((res) => {
            let pic;
            res.forEach((doc) => {
                pic = doc.data();
            });
            getDownloadURL(ref(storage, pic.link)).then((dlRef) => {
                document.body.style.background = `url("${dlRef}") no-repeat center center fixed`;
                document.body.style.backgroundSize = "cover";
            });
        }
        );
});
