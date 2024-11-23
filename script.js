const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = '3176e2b6e0ae5bc053d19025acd8b001';
    const city = document.querySelector('.search-box input').value;

    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
        
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city){
                return;
            }
            else{
                cityHide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active'); 
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'clear.png';
                        break;
                    
                    case 'Rain':
                        image.src = 'rain.png';
                        break;
    
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                
                    case 'Clouds':
                        image.src = 'cloud.png';
                        break;
    
                    case 'Mist':
                    case 'Haze':
                        image.src = 'mist.png';
                        break;
                
                    default:
                        image.src = 'cloud.png';
                        break;
                }
    
                temperature.textContent = `${Math.round(json.main.temp)}°C`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${Math.round(json.wind.speed * 3.6)} km/h`;

                const infoWeather = document.querySelector('.info-weather')
                const infoHumidity = document.querySelector('.info-humidity')
                const infoWind = document.querySelector('.info-wind')
    
                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);
    
                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');
    
                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');
    
                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                // Remove existing clones before adding new ones
                document.querySelectorAll('.active-clone').forEach(clone => clone.remove());

                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);

                const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const totalcloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoWeatherFirst = cloneInfoWeather[0];

                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoHumidityFirst = cloneInfoHumidity[0];

                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneInfoWindFirst = cloneInfoWind[0];

               if (totalcloneInfoWeather > 0) {
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoHumidityFirst.remove();
                        cloneInfoWindFirst.remove();
                    }, 2200);
               }
            }

         });
});



// Funtion for Clock to display time and date
function updateDateTime() {
    const now = new Date();

    // Format date as DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0'); // Add leading zero if necessary
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = now.getFullYear();

    const formattedDate = `${day}/${month}/${year} |`; // Combine date, month, year
    const formattedTime = now.toLocaleTimeString(); // Get time in HH:MM:SS format

    document.getElementById("dateTime").textContent = `${formattedDate} ${formattedTime}`;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);
