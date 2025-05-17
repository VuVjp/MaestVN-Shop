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

document.getElementById("loginButton").addEventListener("click", doLogin);

function doLogin() {
  const username = document.getElementById('inputUsername').value;
  const password = document.getElementById('inputPassword').value;

  var http = new XMLHttpRequest();
  var resp = {
    "status": 0,
    "code": 0,
    "msg": ""
  };

  http.onreadystatechange = function(resp) {
    if (this.readyState != 4) {
      alert("ko request dc");
      return;
    }

    j = JSON.parse(this.responseText);

    resp["status"] = this.status,
    resp["code"] = JSON.parse(this.responseText);
    resp["msg"] = responseText
  };

  return;
}
