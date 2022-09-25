document.getElementById("logIn").addEventListener("submit", userLogIn);

function userLogIn() {
	event.preventDefault();

	const userData = JSON.parse(localStorage.getItem("userData")) || [];

	let email = document.getElementById("emailLogIn").value;
	let password = document.getElementById("passwordLogIn").value;
	let successFull = false;
	let userName = "";
	for (let i = 0; i < userData.length; i++) {
		if (userData[i].email == email && userData[i].password == password) {
			successFull = true;
			userName = userData[i].name;
			break;
		}
	}
	if (successFull) {
		localStorage.setItem("loggedIn", true);
		localStorage.setItem("userName", userName);
		alert("Login SuccessFull ! Redirecting to Home Page");
		location.href = "./index.html";
	} else {
		localStorage.setItem("loggedIn", false);
		alert("Incorrect Credentials!");
	}
	document.getElementById("emailLogIn").value = "";
	document.getElementById("passwordLogIn").value = "";
}
