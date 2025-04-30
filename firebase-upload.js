
// Firebase configuration (استبدل البيانات بتاعتك من Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
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
