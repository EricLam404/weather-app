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

    const card = document.createElement('div');
    card.classList.add('card');
    card.append(addChangeTemp());

    const content = document.createElement('div');
    content.classList.add("card-contents");


    let weather = await getWeatherCity(city);

    if(weather){
        if(container.firstChild){
            container.removeChild(container.firstChild);
        }
        let data = {
            name: weather.name + ", " + weather.sys.country, 
            weather: weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.substring(1), 
            temperature: weather.main.temp + "°F", 
            ["feels Like"]: weather.main.feels_like + "°F", 
            humidity: weather.main.humidity + "%", 
            pressure: weather.main.pressure + "mb", 
            ["wind Speed"]: weather.wind.speed + "mph", 
            ["wind Degrees"]: weather.wind.deg + "°"
        };

        for(const property in data){
            let element = document.createElement('div');
            element.classList.add(property.split(' ').join(''));
            if(property !== "name"){
                element.textContent = property[0].toUpperCase() + property.substring(1) + ": " + data[property];
            }
            else{
                element.textContent = data[property];
            }
        
            content.append(element);
        }

        document.body.style.backgroundImage = bgWeathers[weather.weather[0].main];
        card.append(content);
        container.append(card);
    }
}

function addChangeTemp(){
    const button = document.createElement('label');
    button.classList.add("toggle");

    const name = document.createElement("span");
    name.classList.add("temp");
    name.textContent = "°F";

    const box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    box.classList.add("check")
    box.addEventListener('click', (e) => {
        const temp = document.querySelector(".temperature");
        const split = temp.textContent.split(" ");
        const tempName = split[0]
        const temperature = split[1].split("°");

        const feelsTemp = document.querySelector(".feelsLike");
        const feelsSplit = feelsTemp.textContent.split(" ");
        const feelsTempName = feelsSplit[0] + " " + feelsSplit[1];
        const feelsTemperature = feelsSplit[2].split("°");

        if(e.target.checked){
            name.textContent = "°C";
            temp.textContent = tempName + " " + convertToC(temperature[0]).toFixed(2) + "°C";
            feelsTemp.textContent = feelsTempName + " " + convertToC(feelsTemperature[0]).toFixed(2) + "°C";
        }
        else{
            name.textContent = "°F";
            temp.textContent = tempName + " " + convertToF(temperature[0]).toFixed(2) + "°F";
            feelsTemp.textContent = feelsTempName + " " + convertToF(feelsTemperature[0]).toFixed(2) + "°F";
        }
    });

    const slider = document.createElement("span");
    slider.classList.add("slider");

    button.append(name, box, slider);
    return button;
}

function convertToF(C){
    return C * 9 / 5 + 32;
}

function convertToC(F){
    return (F-32) * 5 / 9;
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