
// Firebase configuration (استبدل البيانات بتاعتك من Firebase Console)
const firebaseConfig = {
  apiKey: "<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAoxtJnu-hh2u73P1ib2Z4t2Hmgxi6xjJA",
    authDomain: "egyptube-12099.firebaseapp.com",
    projectId: "egyptube-12099",
    storageBucket: "egyptube-12099.firebasestorage.app",
    messagingSenderId: "1039610895588",
    appId: "1:1039610895588:web:0f9e6e97c4bfbb9fe6e0f1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function uploadVideo() {
  const file = document.getElementById('videoFile').files[0];
  if (!file) return alert('اختر فيديو أولاً');

  const storageRef = storage.ref('videos/' + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('status').innerText = 'جاري الرفع: ' + Math.round(progress) + '%';
    },
    (error) => {
      document.getElementById('status').innerText = 'حدث خطأ: ' + error;
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        document.getElementById('status').innerText = 'تم الرفع بنجاح';
        document.getElementById('preview').src = downloadURL;
      });
    }
  );
}
