import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoxtJnu-hh2u73P1ib2Z4t2Hmgxi6xjJA",
  authDomain: "egyptube-12099.firebaseapp.com",
  projectId: "egyptube-12099",
  storageBucket: "egyptube-12099.appspot.com",
  messagingSenderId: "1039610895588",
  appId: "1:1039610895588:web:0f9e6e97c4bfbb9fe6e0f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById('upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('videoFile').files[0];
  const title = document.getElementById('videoTitle').value;
  const desc = document.getElementById('videoDesc').value;
  const storageRef = ref(storage, 'videos/' + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await addDoc(collection(db, "videos"), { title, desc, url });
  alert("Video uploaded!");
  location.reload();
});

async function loadVideos() {
  const videoList = document.getElementById('video-list');
  const querySnapshot = await getDocs(collection(db, "videos"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const videoEl = document.createElement('video');
    videoEl.src = data.url;
    videoEl.controls = true;
    videoEl.title = data.title;
    videoList.appendChild(videoEl);
  });
}
loadVideos();

// Auto refresh every 12 hours
setTimeout(() => {
  location.reload();
}, 43200 * 1000);
