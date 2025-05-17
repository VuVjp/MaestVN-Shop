/*(function () {
  'use strict';
  const form = document.getElementById('signInForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn không reload trang

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Lấy dữ liệu người dùng nhập
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;

    // Đăng nhập giả lập (kiểm tra cứng)
    if (username === 'admin' && password === '123456') {
      // Nếu đúng, chuyển hướng tới profile.html
      window.location.href = 'profile.html';
    } else {
      // Nếu sai, cảnh báo
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  });
})();*/

async function doLogin() {
  const fch = await fetch(
    "http://172.17.132.217:8080/api/signin.php", //url local của tôi
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${document.getElementById('inputUsername').value}&password=${document.getElementById('inputPassword').value}`
    }
  );

  if (!fch.ok) {
    alert("Lỗi do server vui lòng thử lại");
    return;
  }

  const data = await response.json();
  alert(data["msg"]);
  
  if (response.status === 200) {
    window.location.href = "/";
  }
}
