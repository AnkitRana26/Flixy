document.getElementById("signUp").addEventListener("submit", storeData);

class user {
	constructor(name, contact, email, password) {
		this.name = name;
		this.contact = contact;
		this.email = email;
		this.password = password;
	}
}

function storeData() {
	event.preventDefault();
	const userData = JSON.parse(localStorage.getItem("userData")) || [];
	let name = document.getElementById("name").value;
	let contact = document.getElementById("contact").value;
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	if (existUser(email)) {
		alert("Already Registered ! Redirecting to Login");
		location.href = "./login.html";
		return;
	}

	let data = new user(name, contact, email, password);
	userData.push(data);
	localStorage.setItem("userData", JSON.stringify(userData));
	document.getElementById("name").value = "";
	document.getElementById("contact").value = "";
	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	alert("SignUp SucessFully Now LogIn");
	location.href = "./login.html";
}

function existUser(email) {
	const userData = JSON.parse(localStorage.getItem("userData")) || [];

	for (let i = 0; i < userData.length; i++) {
		if (userData[i].email == email) {
			return true;
		}
	}

	return false;
}
