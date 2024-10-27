document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // URL đến Google Apps Script đã được triển khai.
    const scriptURL = 'https://script.google.com/macros/s/AKfycby-C5BDWw-96DyStwKeEpBJxyRtNxYgjixPHue-cBzjX-7tL6ht5JGeMcTufMBWNoyRTQ/exec';
  
    const formData = new FormData();
    formData.append('fname', name);
    formData.append('lname', lastname);
    formData.append('email', email);
    formData.append('message', message);
    // Tạo đối tượng FormData và thêm các trường fname, lname, email, và message
  
    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(response => {
        //   Sử dụng fetch để gửi dữ liệu đến Google Apps Script:
        // method: 'POST': Sử dụng phương thức POST để gửi dữ liệu.
        // body: formData: Gửi đối tượng FormData đã tạo.
        // mode: 'no-cors': Chế độ không sử dụng CORS (Cross-Origin Resource Sharing).
        // then(response => {...}): Nếu gửi thành công, hiển thị thông báo "Message sent successfully!" và làm rỗng form.
        document.getElementById('statusMessage').textContent = 'Message sent successfully!';
        
        document.getElementById('contactForm').reset();
      })
      .catch(error => {
        // catch(error => {...}): Nếu gửi thất bại, hiển thị thông báo lỗi và in lỗi ra console.
        document.getElementById('statusMessage').textContent = 'Error sending message.';
        console.error('Error!', error.message);
      });
  });


