window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconImage = document.getElementById('icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d4564cb2fbdd6b107d5ce68854383621`;

            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data =>{
                console.log(data);

                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                const {country} = data.sys;

                //Formula for celcius
                let celcius = (temp - 32) * (5/9);

                //Set DOM elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = country + '/' + data.name;
                iconImage.src = `http://openweathermap.org/img/w/${icon}.png`;

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }
                    else
                    {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temp;
                    }
                });
            })
        });
    }
});