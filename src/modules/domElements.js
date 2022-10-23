import { getWeatherCity } from "./weather";
import searchIcon from "./imgs/search.svg"

async function createWeatherCard(city){
    const card = document.createElement('div');
    const content = document.createElement('div');

    let weather = await getWeatherCity(city);

    console.log(weather);
    card.append(content);

}

function createLocationForm(){
    const form = document.createElement('form');
    form.classList.add("form-container");

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
    
    document.body.appendChild(form);
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
    let form = document.querySelector('.form-container');
    form.reset();
}

export {createLocationForm, createWeatherCard};