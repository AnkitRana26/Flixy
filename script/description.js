let loggedIn = localStorage.getItem("loggedIn") || false;

if (loggedIn) {
	// document.getElementById("slideshow").style.display = "grid";
	document.getElementById("showDescription").style.display = "block";
	document.getElementById("searchMovies").style.visibility = "visible";
	// document.getElementById("movies").style.display = "grid";
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
	document.getElementById("showDescription").style.display = "none";
	// document.getElementById("sort-buttons").style.display = "none";
	// document.getElementById("movies").style.display = "none";
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



document
	.getElementById("searchMovies")
	.addEventListener("input", debounceFunc(searchMovies, 1000));

function searchMovies() {
	if (document.getElementById("searchMovies").value != "") {
		// document.getElementById("slideshow").style.display = "none";
		// document.getElementById("sort-buttons").style.display = "none";
		document.getElementById("showDescription").style.display = "none";

		document.querySelector("body").setAttribute("class", "abbgg");
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
								    div.setAttribute("class","searchMovieDivs")
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
        
                            document.querySelector("#searchedMovies").append(div);
                        }
                        }).catch(function (err) {
                            

                        });
                        
                    });
			
	} else {
		document.querySelector("body").removeAttribute("class");
		// document.getElementById("slideshow").style.display = "grid";
		document.getElementById("showDescription").style.display = "block";
		// document.getElementById("movies").style.display = "grid";
		document.querySelector("#searchedMovies").innerHTML = "";
	}
}

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

function showDescription(title){
	localStorage.setItem("movieShow",JSON.stringify(title));
	location.href="./movieDescriptionPage.html";
}




/// Showing Descripion

let movieName = JSON.parse(localStorage.getItem("movieShow"))||{};

showMovie(movieName);
function showMovie(movie){
    console.log(movie);

    let apiKey = `e0e1bc458710ab27183d496e8c89f37e`;
	let url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;
    fetch(url).then(function(res){
        res.json().then(function(data){
            console.log(data);
        document.getElementById("showDescription").innerText="";
        let div = document.createElement("div");
        let image = document.createElement("img");
        let title = document.createElement("h2");
        let released = document.createElement("h3");
        let actors = document.createElement("p");
        let plot = document.createElement("p");
        let rating = document.createElement("p");
        let upperDiv = document.createElement("div");



        image.src=`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        title.innerText=movie.title;
        released.innerText=movie.release_date;
        // actors.innerText=`Cast :-${data.Actors}`;
        plot.innerHTML=`<details><summary><h2>Movie Overview</h2> <i class="fa-solid fa-circle-chevron-down"></i></summary>${movie.overview}</details>`;
        rating.innerHTML=` ${movie.vote_average} <i class="fa-solid fa-star"></i>`;
        
        upperDiv.id="upperDiv"
        upperDiv.append(title,released,rating);

        div.append(image,upperDiv);

        let mainDiv = document.createElement("div");
        let trailerDiv = document.createElement("div");

        let videoKey = getVideoKey(data.results);
        trailerDiv.innerHTML=`<details><summary><h2>Related Video</h2> <i class="fa-solid fa-circle-chevron-down"></i></summary><iframe id="ytplayer" type="text/html" width="640" height="360"
        src="https://www.youtube.com/embed/${videoKey}"
        frameborder="0"></iframe></details>`;
        trailerDiv.setAttribute("id","trailerDiv");
        mainDiv.setAttribute("id","mainDiv")
        mainDiv.append(div,plot,trailerDiv);
        
        
        
        
        document.getElementById("showDescription").append(mainDiv);
            







        })

        
    }).catch(function(err){

        console.log("error"+err);
    })










}

function getVideoKey(data){

    let found = false;
    let key ="";
    for(var i=0;i<data.length;i++){

        if(data[i].type=="Trailer"){
            found=true;
            key=data[i].key;
            break;
        }


    }
    if(found){
        return key;
    }
    else{
        if(data.length>0){

            return data[0].key;
        }
    }

    return "";

}