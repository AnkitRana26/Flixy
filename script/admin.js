document.getElementById("listMovies").addEventListener("submit", listMovies);

class MovieData {
	constructor(name, date, poster, rating) {
		this.name = name;
		this.date = date;
		this.poster = poster;
		this.rating = rating;
	}
}

function listMovies() {
	event.preventDefault();
	const movies = JSON.parse(localStorage.getItem("movies")) || [];
	let name = document.getElementById("name").value;
	let date = document.getElementById("date").value;
	let poster = document.getElementById("poster").value;
	let rating = document.getElementById("rating").value;

	let data = new MovieData(name, date, poster, rating);
	movies.push(data);
	localStorage.setItem("movies", JSON.stringify(movies));
	document.getElementById("name").value = "";
	document.getElementById("date").value = "";
	document.getElementById("poster").value = "";
	document.getElementById("rating").value = "";
}
