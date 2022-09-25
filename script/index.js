//slide Default Data

const slide1 = "https://i.ytimg.com/vi/9AnvvEN0gH4/maxresdefault.jpg";
const slide2 =
	"https://images.firstpost.com/wp-content/uploads/2018/03/Lost-in-Space-poster-1280.jpg";
const slide3 =
	"https://lehren.com/wp-content/uploads/2022/09/Brahmastra-Review.jpg";
const slide4 =
	"https://images.thedirect.com/media/article_full/doctor-strange-multiverse-of-madness-mcu-poster-marvel-studios.jpg";
const slide5 =
	"https://www.gamespot.com/a/uploads/screen_kubrick/1578/15789737/3515433-endgamedek.jpg";

//Movies Default data

let loggedIn = localStorage.getItem("loggedIn") || false;

if (loggedIn) {
	document.getElementById("slideshow").style.display = "grid";
	document.getElementById("sort-buttons").style.display = "block";
	document.getElementById("searchMovies").style.visibility = "visible";
	document.getElementById("movies").style.display = "grid";
	document.getElementById("notLogged").style.display = "none";
	document.getElementById("userLogIn").innerText = getName();
	document.getElementById("userLogIn").setAttribute("href", "./index.html");
	document.getElementById("userLogOut").innerText = "LogOut";
	document.getElementById("userLogOut").setAttribute("href", "./login.html");
	document.getElementById("userLogOut").addEventListener("click", function () {
		event.stopImmediatePropagation();
		localStorage.removeItem("loggedIn");
		alert("Logged Out");

		location.href = "./index.html";
	});
} else {
	document.getElementById("searchMovies").style.visibility = "hidden";
	document.getElementById("slideshow").style.display = "none";
	document.getElementById("sort-buttons").style.display = "none";
	document.getElementById("movies").style.display = "none";
	document.getElementById("notLogged").style.display = "block";
	document.querySelector("body").setAttribute("class", "bagckground");
	document.getElementById("userLogIn").innerText = "LogIn";
	document.getElementById("userLogIn").setAttribute("href", "./login.html");
	document.getElementById("userLogOut").innerText = "SignUp";
	document.getElementById("userLogOut").setAttribute("href", "./SignUp.html");
}

function getName() {
	let name = localStorage.getItem("userName");
	let res = "";
	for (var i = 0; i < name.length; i++) {
		if (name[i] == " ") {
			break;
		} else {
			res += name[i];
		}
	}
	return res;
}

let defalutMovies = [
	{
		name: "RRR",
		image:
			"https://i.pinimg.com/564x/00/43/bc/0043bc76f7e4c1e3f6f4cede519d62cc.jpg",
		rating: 6,
		releaseDate: "01/01/2022",
	},
	{
		name: "Doctor Strange",
		image:
			"https://i.pinimg.com/564x/31/b6/48/31b64837f1e62fa177bc7fd22ca3510c.jpg",
		rating: 8,
		releaseDate: "01/01/2022",
	},
	{
		name: "Stranger Things",
		image:
			"https://i.pinimg.com/564x/76/51/86/7651861119b0c78916cf8e944e33440d.jpg",
		rating: 9,
		releaseDate: "01/01/2022",
	},
	{
		name: "Bharat",
		image:
			"https://i.pinimg.com/564x/63/d3/6e/63d36e16a4162b15902903f4adf733a2.jpg",
		rating: 4,
		releaseDate: "01/01/2022",
	},
	{
		name: "Avenger",
		image:
			"https://i.pinimg.com/564x/11/b7/b8/11b7b8c0092a2a71e4f75d5186709cb6.jpg",
		rating: 8,
		releaseDate: "01/01/2022",
	},
	{
		name: "Hera Pheri",
		image:
			"https://i.pinimg.com/564x/08/d9/b9/08d9b9ed7096ecf6f392fe032f300d21.jpg",
		rating: 10,
		releaseDate: "01/01/2022",
	},
	{
		name: "Boss Baby",
		image:
			"https://i.pinimg.com/564x/a5/64/9e/a5649eaa52bf0d0b5f5b20ab2a8385c3.jpg",
		rating: 10,
		releaseDate: "01/01/2022",
	},
	{
		name: "Chennai Express",
		image:
			"https://i.pinimg.com/736x/79/6f/fb/796ffba1a00cb2accdc6abb30e6bcc30.jpg",
		rating: 8,
		releaseDate: "01/01/2022",
	},
	{
		name: "Dangal",
		image:
			"https://i.pinimg.com/736x/64/14/c9/6414c974a134e3d293ca06acb5be88b6.jpg",
		rating: 7,
		releaseDate: "01/01/2022",
	},
];


getTrendingArray();

function showSlideShow(slideshowArr){

setInterval(() => {
	// let slideshowArr =trendingArr
	let slideIndex = localStorage.getItem("slideIndex") || 0;
	let imageTag = document.getElementById("slideshowImage");
	imageTag.setAttribute("src", `https://image.tmdb.org/t/p/original/${slideshowArr[slideIndex].poster_path}
	`);

	if (slideIndex == slideshowArr.length - 1) {
		slideIndex = 0;
	} else {
		slideIndex++;
	}
	localStorage.setItem("slideIndex", slideIndex);
}, 5000);
}

const movies = JSON.parse(localStorage.getItem("movies")) || defalutMovies;

display(movies);

function display(arr) {
	document.getElementById("movies").innerText = "";

	arr.map(function (elem) {
		let div = document.createElement("div");
		let img = document.createElement("img");
		let h2 = document.createElement("h2");
		let p = document.createElement("p");

		img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${elem.poster_path}`);
		h2.innerText = elem.title;
		p.innerHTML = `${elem.vote_average} <i class="fa-solid fa-star"></i>`;

		div.append(img, h2, p);

		div.setAttribute("class", "movieCard");
		document.getElementById("movies").append(div);
	});
}

document.getElementById("sorting").addEventListener("change", sortMovies);

function debounceFunc(callBack, time) {
	
	let timedId;
	let count=1;
	return function google(){
		if (timedId) {
			clearTimeout(timedId);
		}
		timedId = setTimeout(() => {
			callBack();
		}, time);
	}
	
}

function sortMovies() {
	const value = document.getElementById("sorting").value;
	
	const api =`e0e1bc458710ab27183d496e8c89f37e`
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`;
	let returnArr = []
	fetch(url).then(function(res){
		res.json().then(function(movies){
			if (value == "sort-lh") {
				movies.results.sort(function (a, b) {
					return a.vote_average - b.vote_average;
				});
			} else if (value == "sort-hl") {
				movies.results.sort(function (a, b) {
					return b.vote_average - a.vote_average;
				});
			}
		
			display(movies.results);
		})
	}).catch(function(err){
		console.log(err);
	})



	// console.log(returnArr);

	// return returnArr;
	
	
}

//Searching Functionality
//730a049d
//247584b0
document
	.getElementById("searchMovies")
	.addEventListener("input", debounceFunc(searchMovies, 500));

	function searchMovies() {
		if (document.getElementById("searchMovies").value != "") {
			document.getElementById("slideshow").style.display = "none";
			document.getElementById("sort-buttons").style.display = "none";
			document.getElementById("movies").style.display = "none";
	
			document.querySelector("body").setAttribute("class", "addBG");
			// document.querySelector("body").removeAttribute("class");
	
	
			let movieName = document.getElementById("searchMovies").value.replaceAll(" ","+");
			let apiKey = `e0e1bc458710ab27183d496e8c89f37e`;
			let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
			
	
			let fetchPromise = fetch(url)
				.then(function (res) {
						res.json().then(function (data) {
								if(data.results.length>0){
									console.log(data);
									document.querySelector("#searchedMovies").innerHTML = "";
									// console.log(data.Search);
									data.results.map(function (res) {
										let div = document.createElement("div");
										let img = document.createElement("img");
										let subDiv = document.createElement("div");
										let title = document.createElement("h2");
										let rating = document.createElement("p");
										let releaseDate = document.createElement("p");
										let genre = document.createElement("p");
										let recommended = document.createElement("button");
		
										img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${res.poster_path}`);
										img.setAttribute("alt", "Movie Poster is Not There");
										title.innerText = res.title;
										genre.innerText = res.release_date;
										rating.innerHTML = ` ${res.vote_average} <i class="fa-solid fa-star"></i>`;
										// releaseDate.innerText = res.Year;
		
										subDiv.append(title,genre);
		
										recommended.innerText = "Recommended";
										div.append(img, subDiv, recommended);
										div.style.cursor="pointer";
										div.addEventListener('click',function(){
											showDescription(res);
											console.log(res);
										})
										document.querySelector("#searchedMovies").append(div);
								});
							}
							else{
								document.querySelector("#searchedMovies").innerHTML = "";
								// console.log(res);
								let div = document.createElement("div");
								let h2 = document.createElement("h2");
								let img = document.createElement("img");
								let h22 = document.createElement("h2");
			
								img.setAttribute(
									"src",
									`https://cdn.vox-cdn.com/uploads/chorus_asset/file/8692949/no_words_homer_into_brush.gif`
								);
								h2.innerText = `Movie`;
								h22.innerText = `Not Found`;
								h2.setAttribute("class", "center");
								h22.setAttribute("class", "center");
								// subDiv.append(title, releaseDate, genre, rating);
			
								div.append(h2, img, h22);
								div.setAttribute("class","searchMovieDivs")
								document.querySelector("#searchedMovies").append(div);
							}
							}).catch(function (err) {
								
	
							});
							
						});
				
		} else {
			document.querySelector("body").removeAttribute("class");
			document.getElementById("slideshow").style.display = "grid";
			// document.getElementById("showDescription").style.display = "block";
			document.getElementById("movies").style.display = "grid";
			document.querySelector("#searchedMovies").innerHTML = "";
		}
	}



function showDescription(title){
	localStorage.setItem("movieShow",JSON.stringify(title));
	location.href="./movieDescriptionPage.html";
}



function getTrendingArray(){

	const api =`e0e1bc458710ab27183d496e8c89f37e`
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`;
	let returnArr = []
	fetch(url).then(function(res){
		res.json().then(function(data){
			showSlideShow(data.results)
			display(data.results);
			console.log(data.results);
		})
	}).catch(function(err){
		console.log(err);
	})



	// console.log(returnArr);

	// return returnArr;


}