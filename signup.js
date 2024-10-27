import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
    const db = getFirestore(app)
    
    const formSignUp = document.getElementById('form-signup')
    const button = document.getElementById('btn_signup')

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function validatePassword(password) { //validatePassword : tên một hàm trong js dùng để kiểm tra độ dài password 
      return password.length > 6; 
      // Kiểm tra nêu mật khẩu lớn hơn 6 ký tự. Trả về "true" nếu mật khẩu dài hơn 6 ký tự, ngược lại là "false"
    }

    formSignUp.addEventListener("submit", async (e) => { 
        e.preventDefault();// ngăn chặn hành vi mặc định
      
        
        button.disabled = true; // ngăn chặn nhấn nhiều lần
      
        //thông báo  
        const loadingToast = Toastify({
          text: "Registering...",
          duration: -1, 
          close: true,
          gravity: "top", 
          position: "right", 
          backgroundColor: "#333",
          stopOnFocus: true 
        }).showToast();
      
        let firstName = document.getElementById("firstName").value; 
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("pass").value;
        //lấy giá trị từ các trường nhập liệu
      
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password); //tạo người dùng với email và password
          const user = userCredential.user;
          //lấy thông tin người dùng từ userCredential
          console.log(user);// in user
          
      
          await updateProfile(user, {     //cập nhật thông tin người dùng
            displayName: firstName + " " + lastName,  //displayname chứa firstname và lastanme
          });
      // lưu thông tin trong firebase
          await setDoc(doc(db, "users", user.uid), {  
            firstName,
            lastName,
            email,
          });
      
          loadingToast.hideToast();// ẩn 
      
          // thông báo
          Toastify({               
            text: "Register Successfully!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "#4CAF50",
            stopOnFocus: true 
          }).showToast();
      
      
          setTimeout(() => { // chờ  3 giây
            window.location.href = "signin.html";
          }, 3000); 
      
        } catch (error) {
          loadingToast.hideToast();// ẩn
      // thông báo
          Toastify({
            text: "Error: " + error.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right", 
            backgroundColor: "#f44336",
            stopOnFocus: true 
          }).showToast();
        } finally {
          button.disabled = false;// không vô hiệu hoá ngăn chặn btn
        }
      });
      // quá trình đăng ký : lấy thông tin từ form -> createUserWithEmailAndPassword -> localstorage -> đăng nhập thành công