import { getWeatherCity } from "./weather";
import searchIcon from "./imgs/search.svg";
import fog from "./imgs/fog.jpeg";
import drizzle from "./imgs/drizzle.jpeg";
import rain from "./imgs/rain.jpeg";
import snow from "./imgs/snow.jpeg";
import clear from "./imgs/clear.jpeg";
import clouds from "./imgs/clouds.jpeg";
import thunderstorm from "./imgs/thunderstorm.jpeg"
import mist from "./imgs/mist.jpeg"
import smoke from "./imgs/smoke.jpeg"
import haze from "./imgs/haze.jpeg"
import dust from "./imgs/dust.jpeg"
import sand from "./imgs/sand.jpeg"
import ash from "./imgs/ash.jpeg"
import squall from "./imgs/squall.jpeg"
import tornado from "./imgs/tornado.jpeg"

const bgWeathers = {
    Fog: `url(${fog})`,
    Drizzle: `url(${drizzle})`,
    Rain: `url(${rain})`,
    Snow: `url(${snow})`,
    Clear: `url(${clear})`,
    Clouds: `url(${clouds})`,
    Thunderstorm: `url(${thunderstorm})`,
    Mist: `url(${mist})`,
    Smoke: `url(${smoke})`,
    Haze: `url(${haze})`,
    Dust: `url(${dust})`,
    Sand: `url(${sand})`,
    Ash: `url(${ash})`,
    Squall: `url(${squall})`,
    Tornado: `url(${tornado})`,
}

function createMainContainer(){
    const container = document.createElement('div');
    container.classList.add('main-container');

    document.body.append(container);
}

async function createWeatherCard(city){
    const container = document.querySelector('.main-container');

    if(container.firstChild){
        container.removeChild(container.firstChild);
    }
    const card = document.createElement('div');
    card.classList.add('card');

    const content = document.createElement('div');
    content.classList.add("card-contents");


    let weather = await getWeatherCity(city);

    if(weather){
        let data = {
            name: weather.name + ", " + weather.sys.country, 
            weather: "Weather: " + weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.substring(1), 
            temp: "Temperature: " + weather.main.temp, 
            feels: "Feels like: " + weather.main.feels_like, 
            humidity: "Humidity: " + weather.main.humidity, 
            pressure: "Pressure: " + weather.main.pressure, 
            windSpeed: "Wind Speed: " + weather.wind.speed, 
            windDeg: "Wind Degrees: " + weather.wind.deg
        };

        for(const property in data){
            let element = document.createElement('div');
            element.classList.add(property);
            element.textContent = data[property];
            content.append(element);
        }
        
        document.body.style.backgroundImage = bgWeathers[weather.weather[0].main];
        console.log(content);
    }
    console.log(weather);
    card.append(content);
    container.append(card);
}

function createLocationForm(){
    const container = document.createElement('div');
    container.classList.add('form-container');

    const form = document.createElement('form');
    form.classList.add("form");

    const location_label = document.createElement('label');
    location_label.setAttribute('for', 'location');
    location_label.textContent = "Enter Location";

    const location = document.createElement('input');
    location.setAttribute('type', 'text');
    location.setAttribute('placeholder', 'City, Country or City or Country');
    location.setAttribute('name', 'location');
    location.classList.add('form-location');
    location.required = true;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let formProps = Object.fromEntries(formData);
        createWeatherCard(formProps.location);
        resetForm();
    });
    form.append(location_label, location, submitButton());

    const errMessage = document.createElement('div');
    errMessage.classList.add('form-error-message');
    errMessage.textContent = "Please enter a valid location in the form of city, country, city or country";
    container.append(form, errMessage);

    let header = document.querySelector('.header');
    header.appendChild(container);
}

function submitButton(){
    let button = document.createElement('button');
    button.classList.add('submit');

    let icon = document.createElement('img');
    icon.src = searchIcon;
    button.appendChild(icon);
    button.setAttribute('type', 'submit');

    return button;
}

function resetForm(){
    let form = document.querySelector('.form');
    form.reset();
}

export {createMainContainer, createLocationForm, createWeatherCard};