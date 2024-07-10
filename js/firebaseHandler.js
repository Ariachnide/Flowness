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

function getMusicExtensionType(track) {
    let s = "";
    for (let i = track.length - 1; i >= 0; i--) {
        if (track[i] == ".") {
            break;
        } else {
            s += track[i];
        }
    }
    return s.split("").reverse().join("");
}

window.addEventListener("load", () => {
    const app = initializeApp(firebaseConfig);

    /* const pastDateList = document.getElementById("pastDateList");
    const plannedDatesElement = document.getElementById("plannedDatesElement");
    const plannedDateList = document.getElementById("plannedDateList");
    let isPlannedDateListDisplayed = false; */
    const db = getFirestore();
    /* getDocs(collection(db, "ShowDates"))
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
    ) */

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

    getDocs(collection(db, "MusicTracks"))
        .then((res) => {
            const trackList = document.getElementById("musicTrackList");

            res.forEach((doc) => {
                const data = doc.data();
                if (!data.visibility) return;

                getDownloadURL(ref(storage, data.link)).then((dlRef) => {
                    const indic = document.createElement("li");
                    const trackTitle = document.createElement("span");
                    trackTitle.classList.add("trackTitle");
                    trackTitle.innerHTML = `${data.title} • `;

                    const audioElement = document.createElement("audio");
                    audioElement.controls = true;
                    audioElement.innerHTML = "Your browser does not support the audio element.";
                    const sourceElement = document.createElement("source");
                    sourceElement.src = dlRef;
                    sourceElement.type = `audio/${getMusicExtensionType(data.link)}`;
                    
                    audioElement.appendChild(sourceElement);
                    indic.appendChild(trackTitle);
                    indic.appendChild(audioElement);
                    trackList.appendChild(indic);
                })
            })
        })
    
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
});
