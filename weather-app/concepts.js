
const API_kEY = "4fd64afbd6e5f6620d7e8c9414723f8e";


// for updating UI
function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp}*C`;
    document.body.appendChild(newPara);
}


// fetching data by searching city name.
async function ShowWeather(){
    try{
        let city = "goa";
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_kEY}&units=metric`);
        let data = await res.json();
        console.log("your result is" , data);
        renderWeatherInfo(data);
    }
    catch(e){
        console.log("error aaye h" , e);
    }
}


// get city name by giving longitude and latitude
async function getCustomWatherDetails(){
    try{
        let longitude = 77.344923125;
        let latitude = 28.683969750000006;
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_kEY}&units=metric`);
        let result = await response.json();
        console.log(result);
    }
    catch(err){
        console.log("error aaye h" , e);

    }
}
ShowWeather();
getCustomWatherDetails();


// getting our current location
function getCurrentLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geoLocation support");
    }
}
function showPosition(position){
    let lat = position.coords.latitude ;
    let longi = position.coords.longitude;
    console.log(lat);
    console.log(longi);
   
}
getCurrentLocation();
