const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const API_KEY = "YOUR_API_KEY";
let currentTab = userTab;
currentTab.classList.add('current-tab');
getFromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');

        // means, we clicked on search-tab (search vaala tab invisible tha ,to usko visible krdo kuki humnse definately dusre tab pr click kra h)
        if(!searchForm.classList.contains('active')){
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');

        }
        // means,we clicked on user-tab
        else{
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');

            // ab mai yourWeatherTab pr hu , to weatherTab bhi display krma pdega , so let's check first local storage for coordinates if we have saved them there
            getFromSessionStorage();
        }


    }
}

userTab.addEventListener('click',() => {
    switchTab(userTab);
})

searchTab.addEventListener('click',() => {
    switchTab(searchTab);
})

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // agr local coordinates nhi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates){
    console.log(coordinates);
    const {lat, lon} = coordinates;
    console.log({lat,lon});
    // make grantcontainer invisible 
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");
    // API call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        console.log(data);
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){
    // firstly we have to fetch the elements
    const cityName = document.querySelector("[data-cityName]") ;
    const countryIcon = document.querySelector("[data-countryIcon]") ;
    const desc = document.querySelector("[data-weatherDesc]") ;
    const weatherIcon = document.querySelector("[data-weatherIcon]") ;
    const temp = document.querySelector("[data-temp]") ;
    const windspeed = document.querySelector("[data-windspeed]") ;
    const humidity = document.querySelector("[data-humidity]") ;
    const cloudiness = document.querySelector("[data-cloudiness]") ;
    
    // fetch values from weatherInfo object and put it under UI elements
    // search on google -> jsonformatter and paste your data generated through api call. 
    cityName.innerText = weatherInfo?.name;
    console.log(cityName);
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    console.log(countryIcon);
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    console.log(desc);
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    console.log(weatherIcon);
    temp.innerText = weatherInfo?.main?.temp;
    console.log(temp);
    windspeed.innerText = weatherInfo?.wind?.speed;
    console.log(windspeed);
    humidity.innerText = weatherInfo?.main?.humidity;
    console.log(humidity);
    cloudiness.innerText = weatherInfo?.clouds?.all;
    console.log(cloudiness);
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
        alert("No GeoLocation Support");
    }
}
function showPosition(position){
    const userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }
    // setting coordinates in session storage
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}   

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click', getLocation);


const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    // hjbeiuifbuerbffiuebnviuebviuebviub

    if(cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(e){
        loadingScreen.classList.remove("active");
    }
}   
