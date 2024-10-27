import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm7HPwaZp9mHWxa9su0DkxezlVed_IMZY",
    authDomain: "tranvietanh-141a9.firebaseapp.com",
    projectId: "tranvietanh-141a9",
    storageBucket: "tranvietanh-141a9.appspot.com",
    messagingSenderId: "249653017996",
    appId: "1:249653017996:web:005291e07cbff7e88baaa9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('product-container'); // Thay product-table thành product-container để chứa các thẻ div
  
    // Lấy dữ liệu sản phẩm từ Firestore theo thời gian thực
    onSnapshot(collection(db, 'products'), (snapshot) => {
      productContainer.innerHTML = ''; // Làm rỗng nội dung cũ của container
  
      snapshot.forEach((docId) => {
        const productDiv = document.createElement('div'); // Tạo thẻ div mới cho mỗi sản phẩm
        productDiv.classList.add('product'); // Thêm class cho thẻ div
  
        // Thiết lập nội dung HTML cho thẻ div mới
        productDiv.innerHTML = `
          <div class="sanphamok">
            <div>
              <img class="imgproduct_ok" src=${docId.data().img} />
            </div>
            <div>
              <span class="spanish">${docId.data().name}</span>
              <span class="spanish1">  $${docId.data().price}</span>
            </div>
          </div>
        `;  
        productContainer.appendChild(productDiv); // cho productDiv lam the con cua productContainer
      });
    });
  });
  