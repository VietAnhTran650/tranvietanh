import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

document.addEventListener("DOMContentLoaded", () => { 
  const handleSignOut = () => { 
    signOut(auth); 
    localStorage.removeItem("displayName"); 
    window.location.href = 'signin.html'; // Điều hướng về trang đăng nhập sau khi đăng xuất
  };

  onAuthStateChanged(auth, (user) => { 
    const inforElement = document.getElementById("information"); 
    const signin_icon = document.getElementById("signin_icon"); 
    const displayName = localStorage.getItem("displayName");
    console.log(displayName);

    if (user || displayName) { 
      inforElement.innerHTML = ` 
        <div>
            
          <span id="displayNameokok">${displayName || user.displayName || "User"}</span>
          <button id='buttonSignOut'>Sign out</button>
        </div>
      `; 
      signin_icon.style.display = 'none'; // Ẩn icon sign-in
      const buttonSignOut = document.getElementById("buttonSignOut"); 
      buttonSignOut.addEventListener("click", handleSignOut); 
    } else { 
      inforElement.innerHTML = ``;
      signin_icon.style.display = 'block'; // Hiển thị icon sign-in
    } 
  });
});
