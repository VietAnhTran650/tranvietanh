import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// DOM elements
const form = document.getElementById("data-form");
const nameInput = document.getElementById("name");
const imgInput = document.getElementById("imgproduct")
const ratingInput = document.getElementById("wrating");
const priceInput = document.getElementById("price");
const dataList = document.getElementById("data-list");
// lấy thông tin từ input với id

// Add or update data in Firestore
form.addEventListener("submit", async (e) => { // async : khai báo một hàm bất đồng bộ
  e.preventDefault();
  const name = nameInput.value;
  const price = priceInput.value;
  const img = imgInput.value;
  const wrating = ratingInput.value;
  // lấy giá trị từ các trường nhập liệu

  if (form.dataset.id) {
    // Update existing document
    const id = form.dataset.id;
    try {
      const userRef = doc(db, "products", id);
      await updateDoc(userRef, { name, price, img, wrating });
      nameInput.value = "";
      priceInput.value = "";
      imgInput.value = "";
      ratingInput.value = "";
      form.dataset.id = "";
      form.querySelector("button").textContent = "Update";
      alert("Document successfully updated");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    // cập nhật tài liệu hiện có. Lấy ID của tài liệu và cập nhật dữ liệu trong Firestore. Sau khi cập nhật thành công, làm rỗng các trường nhập liệu và đặt lại form.




  } else {
    // Add new document
    try {
      await addDoc(collection(db, "products"), { name, price, img, wrating }); //thêm dữ liệu vào firebase
      nameInput.value = "";
      priceInput.value = "";
      imgInput.value = "";
      ratingInput.value = "";
      alert("Document successfully added");// thông báo thêm thành công
    } catch (error) {
      console.error("Error adding document: ", error);// in ra thêm thất bại
    }
  }
});

// Fetch data from Firestore in real-time
onSnapshot(collection(db, "products"), (snapshot) => { //cập nhật theo thời gian thực
  dataList.innerHTML = "";// làm rỗng datalist
  snapshot.forEach((docId) => { 
    const li = document.createElement("div"); //tạo thẻ div
    li.setAttribute("data-id", docId.id);
    li.innerHTML = `
    <span class="nameok">${docId.data().name}</span>
    <span class="priceok">${docId.data().price}</span>
    <img class="imgproduct_ok" src="${docId.data().img}">
    <span class="wrating">${docId.data().wrating}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
`;
dataList.appendChild(li);
    // Edit data
    li.querySelector(".edit").addEventListener("click", () => {
      nameInput.value = docId.data().name; 
      priceInput.value = docId.data().price;
      imgInput.value = docId.data().img;
      ratingInput.value = docId.data().wrating;
      form.dataset.id = docId.id;
      //điền dữ liệu vào form
      form.querySelector("button").textContent = "Update"; // thay đổi nút submit thành update
    });

    // Delete data
    li.querySelector(".delete").addEventListener("click", async () => {// cho delete lắng nghe sự kiện 'click'
      const id = docId.id;
      try {
        await deleteDoc(doc(db, "products", id));
        alert.log(`Product with ID ${id} successfully deleted`);
        // xóa sản phẩm và thông báo xóa thành công
      } catch (error) {
        console.log("Error deleting product: ", error);
        // console.log("URL hình ảnh:", docId.data().img);
      }
    });
  });
});