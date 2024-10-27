import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm7HPwaZp9mHWxa9su0DkxezlVed_IMZY",
  authDomain: "tranvietanh-141a9.firebaseapp.com",
  projectId: "tranvietanh-141a9",
  storageBucket: "tranvietanh-141a9.appspot.com",
  messagingSenderId: "249653017996",  
  appId: "1:249653017996:web:005291e07cbff7e88baaa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const formSignIn = document.getElementById('form-signin');
const button = document.getElementById('btn_signup')
//lấy giá trị từ các trường nhập liệu

formSignIn.addEventListener("submit", async (e) => {// cho form signin lắng nghe sự kiện 'submit'
  e.preventDefault();

  // ngăn chặn bấm nhiều lần
  button.disabled = true;

  //thông báo 
  const loadingToast = Toastify({ 
    text: "Signing in...",
    duration: -1, 
    close: true,
    gravity: "top", 
    position: "right", 
    backgroundColor: "#333",
    stopOnFocus: true, 
  }).showToast();// hiển thị 

  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  //lấy giá trị từ các trường nhập liệu

  try {
    const userCredential = await signInWithEmailAndPassword( // đăng nhập
      auth,
      email,
      pass
    );
    const user = userCredential.user;//lấy thông tin người dùng từ userCredential

    localStorage.setItem("displayName", user.displayName);//lưu displayname vào trong localstorge

    loadingToast.hideToast();//ẩn
//thông báo
    Toastify({
      text: "Sign In Successfully!",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "right", 
      backgroundColor: "#4CAF50",
      stopOnFocus: true, 
    }).showToast();

    // chờ 3 giây
    setTimeout(() => {
      window.location.href = "index.html"
    }, 3000);
  } catch (error) {
    loadingToast.hideToast();
//thông báo
    Toastify({
      text: "Error: " + error.message,
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "right", 
      backgroundColor: "#f44336",
      stopOnFocus: true, 
    }).showToast();
  } finally {
    
    button.disabled = false;
    //xóa ngăn chặn bấm nhiều lần
  }
});
//  quá trình đăng nhập : lấy thông tin từ form -> signInWithEmailAndPassword -> localStorge -> Đăng nhập thành công