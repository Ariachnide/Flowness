import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, getDocs, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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

const t = new Date();
const currentDay = `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`;

function convertDateFormat(s) {
    const d = s.split("/");
    return `${d[1]}/${d[0]}/${d[2]}`;
}

function isDatePast(s) {
    const d = convertDateFormat(s);
    return (new Date(d).getTime() < new Date(currentDay).getTime())
        ? true
        : false;
}

function validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

window.addEventListener("load", () => {
    const app = initializeApp(firebaseConfig);


    const pastDateList = document.getElementById("pastDateList");
    const plannedDatesElement = document.getElementById("plannedDatesElement");
    const plannedDateList = document.getElementById("plannedDateList");
    let isPlannedDateListDisplayed = false;
    const db = getFirestore();
    getDocs(collection(db, "ShowDates"))
        .then((res) => {
            const items = [];
            res.forEach(doc => items.push(doc.data()));
            items
                .sort((a, b) => new Date(convertDateFormat(a.date)) - new Date(convertDateFormat(b.date)))
                .forEach((d) => {
                    if (!d.visibility) return;
                    const el = document.createElement("li");
                    el.classList.add("date-item");
                    if (d.place === "...") {
                        el.innerHTML = "... ... ...";
                        pastDateList.appendChild(el);
                        return;
                    }
                    el.innerHTML = `<b>${d.date}</b> • ${d.place}`;

                    if (isDatePast(d.date)) {
                        pastDateList.appendChild(el);
                    } else {
                        if (!isPlannedDateListDisplayed) {
                            plannedDatesElement.style.display = "block";
                            isPlannedDateListDisplayed = true;
                        }
                        plannedDateList.appendChild(el);
                    }
                });
        }
    )

    const storage = getStorage(app);

    getDocs(collection(db, "IllustrationPics"))
        .then((res) => {
            const carId = "illustrationCarousel";
            const indicatorList = document.getElementById("illustrationCarouselIndicatorList");
            const slideList = document.getElementById("illustrationCarouselSlideList");

            let i = 0;
            res.forEach((doc) => {
                const data = doc.data();
                if (!data.visibility) return;

                getDownloadURL(ref(storage, data.link)).then((dlRef) => {
                    const indic = document.createElement("li");
                    indic.dataset.target = "#" + carId;
                    indic.dataset.slideTo = i;
                    indicatorList.appendChild(indic);
    
                    const slideItem = document.createElement("div");
                    slideItem.classList.add("carousel-item");
                    slideList.appendChild(slideItem);

                    const slideImg = document.createElement("img");
                    slideImg.classList.add("d-block", "w-100");
                    slideImg.alt = data.alt;
                    slideImg.src = dlRef;

                    slideItem.appendChild(slideImg);

                    if (i === 0) {
                        indic.classList.add("active");
                        slideItem.classList.add("active");
                    }
                    i++;
                });

            });
        });
    
    getDocs(collection(db, "GroupPics"))
        .then((res) => {
            const carId = "groupCarousel";
            const indicatorList = document.getElementById("groupCarouselIndicatorList");
            const slideList = document.getElementById("groupCarouselSlideList");

            let i = 0;
            res.forEach((doc) => {
                const data = doc.data();
                if (!data.visibility) return;

                getDownloadURL(ref(storage, data.link)).then((dlRef) => {
                    const indic = document.createElement("li");
                    indic.dataset.target = "#" + carId;
                    indic.dataset.slideTo = i;
                    indicatorList.appendChild(indic);
    
                    const slideItem = document.createElement("div");
                    slideItem.classList.add("carousel-item");
                    slideList.appendChild(slideItem);

                    const slideImg = document.createElement("img");
                    slideImg.classList.add("d-block", "w-100");
                    slideImg.alt = data.alt;
                    slideImg.src = dlRef;

                    slideItem.appendChild(slideImg);

                    if (i === 0) {
                        indic.classList.add("active");
                        slideItem.classList.add("active");
                    }
                    i++;
                });

            });
        });
    
    getDocs(collection(db, "PressPics"))
        .then((res) => {
            const carId = "pressCarousel";
			const indicatorList = document.getElementById("pressCarouselIndicatorList");
            const slideList = document.getElementById("pressCarouselSlideList");

            let i = 0;
            res.forEach((doc) => {
                const data = doc.data();
                if (!data.visibility) return;

                getDownloadURL(ref(storage, data.link)).then((dlRef) => {
                    const indic = document.createElement("li");
                    indic.dataset.target = "#" + carId;
                    indic.dataset.slideTo = i;
                    indicatorList.appendChild(indic);
    
                    const slideItem = document.createElement("div");
                    slideItem.classList.add("carousel-item");
                    slideList.appendChild(slideItem);
    
                    const slideImg = document.createElement("img");
                    slideImg.classList.add("d-block", "w-100");
                    slideImg.src = dlRef;
                    slideImg.alt = data.alt;
                    slideItem.appendChild(slideImg);
    
                    if (i === 0) {
                        indic.classList.add("active");
                        slideItem.classList.add("active");
                    }
                    i++;
                });
            });
        });
    
    getDocs(collection(db, "Video"))
        .then((res) => {
            const videos = [];
            res.forEach((doc) => videos.push(doc.data()));
            const frontVideo = videos.find(v => v.name === "FrontVideo");

            getDownloadURL(ref(storage, frontVideo.link)).then((dlRef) => {
                const videoElement = document.createElement("video");
                const sourceElement = document.createElement("source");
                
                videoElement.id = "backgroundVideo";
                videoElement.autoplay = true;
                videoElement.loop = true;
                videoElement.muted = true;
        
                sourceElement.id = "frontVideo";
                sourceElement.src = dlRef;
                sourceElement.type = "video/" + frontVideo.type;
        
                videoElement.appendChild(sourceElement);
                document.getElementById("header").appendChild(videoElement);
            });
        });
    
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
    
    let isContactOnCoolDown = false;
    
    document.getElementById("sendMsg").addEventListener("click", function() {
        const msgStatus = document.getElementById("contactMsgStatus");
        if (isContactOnCoolDown) {
            msgStatus.textContent = "Vous venez d'envoyer un message, veuillez patienter quelques secondes avant d'en envoyer un nouveau";
            msgStatus.classList.remove("statusError");
            return;
        }

        const email = document.getElementById("emailInput").value;
        if (!validateEmail(email) || email.length > 255) {
            msgStatus.textContent = "Adresse email invalide";
            msgStatus.classList.add("statusError");
            return;
        }

        const msg = document.getElementById("txtInput").value;
        if (msg.length < 10) {
            msgStatus.textContent = "Votre message doit contenir au moins 10 caractères";
            msgStatus.classList.add("statusError");
            return;
        } else if (msg.length > 500) {
            msgStatus.textContent = "Votre message ne peut pas contenir plus de 500 caractères";
            msgStatus.classList.add("statusError");
            return;
        }

        const date = new Date(Date.now());
        const pathSegment = date.toDateString() + " " + date.toLocaleTimeString("fr-FR") + " " + Math.random();

        setDoc(doc(db, "Contact", pathSegment), {
            email: email,
            content: msg
        }).then(() => {
            msgStatus.textContent = "Merci pour votre message !";
            msgStatus.classList.remove("statusError");
            isContactOnCoolDown = true;
            setTimeout(() => {
                isContactOnCoolDown = false;
            }, 30000);
        }).catch(() => {
            msgStatus.textContent = "Erreur lors de l'envoi du message... Veuillez nous excuser pour la gêne occasionnée et réessayer un peu plus tard.";
            msgStatus.classList.add("statusError");
            return;
        });
    });
});
