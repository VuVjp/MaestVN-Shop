async function doReg() {
    const inputUsername = document.getElementById('inputUsername').value; 
    const inputEmail = document.getElementById('inputEmail').value; 
    const inputPassword = document.getElementById('inputPassword').value;

    const response = await fetch(
      "http://172.17.128.237:8080/api/signup.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${inputUsername}&password=${inputPassword}&email=${inputEmail}`
      }
    );

    if (!response.ok) {
      alert("Lỗi do server vui lòng thử lại");
      return;
    }

    const data = await response.json(); // dùng đúng biến 'response'
    alert(data["msg"]);
  
    if (response.status === 200) {
      window.location.href = "/";
    }
}