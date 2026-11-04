const url = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "9fa4b1f3db444bb494cc0e69eeaba5f3";

async function getweatherdata(city) {
    let finalurl= `${url}q=${city}&appid=${apikey}`;
    let weatherdata=await fetch(finalurl).then(res=>res.json());
    console.log(weatherdata);
    

    if(weatherdata.cod == 404) {
        mainbox2.classList.add("inactive");
        mainbox3.classList.remove("inactive");
        desc.innerHTML = "Description";
        temp.innerText = "0°C";
        wind.innerText = "0km/hr";
        humidity.innerText = "0%";
        citi.innerText = "New York";
        search.value = "";
        icon.src = "weathericon.png";
        return;
    }

    desc.innerHTML = weatherdata.weather[0].description;
    temp.innerText = (weatherdata.main.temp-273.15).toFixed(2) +"°C";
    wind.innerText = weatherdata.wind.speed + "km/hr";
    humidity.innerText = weatherdata.main.humidity + "%";
    citi.innerText = city;

    changeicon(weatherdata.weather[0].main);
}


// Js File Acess
const startbtn = document.querySelector(".start");
const search = document.querySelector(".inputfield");
const srchicon = document.querySelector(".searchicon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const citi = document.querySelector("#city");
const wind = document.querySelector("#windspeed");
const humidity = document.querySelector("#humiditytype");
const gohome = document.querySelector(".homebtn");
const icon = document.querySelector("#icon");
const mainbox1 = document.querySelector(".mainbox1");
const mainbox2 = document.querySelector(".mainbox2");
const mainbox3 = document.querySelector(".mainbox3");

startbtn.addEventListener("click" , () => {
    mainbox1.classList.add("inactive");
    mainbox2.classList.remove("inactive");
})

gohome.addEventListener("click" , () => {
    mainbox3.classList.add("inactive");
    mainbox1.classList.remove("inactive");
    search.innerText = "";
})

srchicon.addEventListener("click" , () => {
    console.log("Hi")
    getweatherdata(search.value);
})

search.addEventListener("keypress" , (e) => {
    if(e.key == "Enter") {
        getweatherdata(search.value);
    }
})


function changeicon(weathermain) {
    let icons ={
        Clouds: "clouds.webp",
        Rain: "rain.png",
        Mist: "mist.png",
        Haze: "haze.png",
        Snow: "snow.png",
        Clear: "clear.png"
    };
    icon.src = icons[weathermain] || "clear.png";
}