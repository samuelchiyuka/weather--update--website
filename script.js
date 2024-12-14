document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const saveFavoriteButton = document.getElementById('saveFavorite');
    const languageSelect = document.getElementById('languageSelect');
    const unitSelect = document.getElementById('unitSelect');
    const errorMessage = document.getElementById('errorMessage');
    const apiKey = '124b92a8dd9ec01ffb0dbf64bc44af3c';

    function fetchWeather(city, language, units) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${language}&units=${units}&appid=${apiKey}`;
        fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Failed to fetch weather data');
            }
        }
        return response.json();
    })
    .then(data => {
        updateWeatherInfo(data);
        errorMessage.textContent = '';
    })
    .catch(error => {
        errorMessage.textContent = `Error: ${error.message}`;
        console.error('Error fetching weather data:', error);
    });

    }
    function updateWeatherInfo(data) {
        const days = [1, 2, 3, 4, 5];
        days.forEach((day, index) => {
            const weatherData = data.list[index * 8];
            document.getElementById(`temp${day}`).textContent = weatherData.main.temp.toFixed(1) + '°';
            document.getElementById(`humidity${day}`).textContent = weatherData.main.humidity + '%';
            document.getElementById(`windSpeed${day}`).textContent = weatherData.wind.speed.toFixed(1) + ' m/s';
            document.getElementById(`icon${day}`).src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
            document.body.className = getBackgroundClass(weatherData.weather[0].description);
        });

        document.getElementById("languageSelect").addEventListener("change", (event) => {
            const selectedLanguage = event.target.value;
            updateLanguage(selectedLanguage);
        });
        
        function updateLanguage(language) {
            const elementsToTranslate = {
                header: document.querySelector("header h1"),
                currentWeather: document.querySelector(".current-weather h3"),
                temperature: document.querySelector(".current-weather p:first-child"),
                humidity: document.querySelector(".current-weather p:nth-child(3)"),
                windSpeed: document.querySelector(".current-weather p:nth-child(4)"),
                calendar: document.querySelector("#calendar h2"),
                localTime: document.querySelector("#localTime h2"),
                worldMap: document.querySelector("#worldMap h1"),
            };

            for (const key in elementsToTranslate) {
                if (translations[language] && translations[language][key]) {
                    elementsToTranslate[key].textContent = translations[language][key];
                } else {
                    elementsToTranslate[key].textContent = translations['en'][key];
                }
            }
            
        }
        const translations = {
            en: {
                header: "Weather Update",
                currentWeather: "Current Weather",
                temperature: "Temperature",
                humidity: "Humidity",
                windSpeed: "Wind Speed",
                calendar: "Calendar",
                localTime: "Local Time",
                worldMap: "World Map",
            },
            es: {
                header: "Actualización del Clima",
                currentWeather: "Clima Actual",
                temperature: "Temperatura",
                humidity: "Humedad",
                windSpeed: "Velocidad del Viento",
                calendar: "Calendario",
                localTime: "Hora Local",
                worldMap: "Mapa Mundial",
            },
            fr: {
                header: "Mise à Jour Météo",
                currentWeather: "Météo Actuelle",
                temperature: "Température",
                humidity: "Humidité",
                windSpeed: "Vitesse du Vent",
                calendar: "Calendrier",
                localTime: "Heure Locale",
                worldMap: "Carte du Monde",
            },
            de: {
                header: "Wetter-Update",
                currentWeather: "Aktuelles Wetter",
                temperature: "Temperatur",
                humidity: "Luftfeuchtigkeit",
                windSpeed: "Windgeschwindigkeit",
                calendar: "Kalender",
                localTime: "Ortszeit",
                worldMap: "Weltkarte",
            },
            it: {
                header: "Aggiornamento Meteo",
                currentWeather: "Meteo Attuale",
                temperature: "Temperatura",
                humidity: "Umidità",
                windSpeed: "Velocità del Vento",
                calendar: "Calendario",
                localTime: "Ora Locale",
                worldMap: "Mappa del Mondo",
            },
            zh: {
                header: "天气更新",
                currentWeather: "当前天气",
                temperature: "温度",
                humidity: "湿度",
                windSpeed: "风速",
                calendar: "日历",
                localTime: "当地时间",
                worldMap: "世界地图",
            },
            ru: {
                header: "Обновление Погоды",
                currentWeather: "Текущая Погода",
                temperature: "Температура",
                humidity: "Влажность",
                windSpeed: "Скорость Ветра",
                calendar: "Календарь",
                localTime: "Местное Время",
                worldMap: "Карта Мира",
            },
            ar: {
                header: "تحديث الطقس",
                currentWeather: "الطقس الحالي",
                temperature: "درجة الحرارة",
                humidity: "الرطوبة",
                windSpeed: "سرعة الرياح",
                calendar: "التقويم",
                localTime: "الوقت المحلي",
                worldMap: "خريطة العالم",
            },
            ja: {
                header: "天気予報",
                currentWeather: "現在の天気",
                temperature: "気温",
                humidity: "湿度",
                windSpeed: "風速",
                calendar: "カレンダー",
                localTime: "現地時間",
                worldMap: "世界地図",
            },
            pt: {
                header: "Atualização do Clima",
                currentWeather: "Clima Atual",
                temperature: "Temperatura",
                humidity: "Umidade",
                windSpeed: "Velocidade do Vento",
                calendar: "Calendário",
                localTime: "Hora Local",
                worldMap: "Mapa Mundial",
            },
            hi: {
                header: "मौसम अपडेट",
                currentWeather: "वर्तमान मौसम",
                temperature: "तापमान",
                humidity: "आर्द्रता",
                windSpeed: "पवन गति",
                calendar: "पंचांग",
                localTime: "स्थानीय समय",
                worldMap: "विश्व मानचित्र",
            },
        };
            
    }
    function getBackgroundClass(weatherDescription) {
        const description = weatherDescription.toLowerCase();
        let weatherClass = 'default';
    
        if (description.includes('rainy') || description.includes('rain')) {
            weatherClass = 'rainy';
        } else if (description.includes('drizzle')) {
            weatherClass = 'drizzly';
        } else if (description.includes('snow')) {
            weatherClass = 'snowy';
        } else if (description.includes('clear')) {
            weatherClass = 'sunny';
        } else if (description.includes('clouds')) {
            weatherClass = description.includes('few') ? 'partly-cloudy' : 'cloudy';
        } else if (description.includes('fog') || description.includes('mist') || description.includes('haze')) {
            weatherClass = 'foggy';
        } else if (description.includes('dust') || description.includes('sand') || description.includes('ash')) {
            weatherClass = 'dusty';
        } else if (description.includes('storm') || description.includes('tornado')) {
            weatherClass = 'stormy';
        }
    
        document.body.className = document.body.className.replace(/(sunny|rainy|drizzly|snowy|cloudy|partly-cloudy|foggy|dusty|stormy|default)/g, '').trim();
        return `${document.body.className} ${weatherClass}`.trim();
    }
    
    function updateTime() {
        const now = new Date();
        document.getElementById('timeDisplay').textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);

    searchBar.addEventListener('change', () => {
        const city = searchBar.value;
        const language = languageSelect.value;
        const units = unitSelect.value; 
        fetchWeather(city, language, units);
    });

    languageSelect.addEventListener('change', () => {
        const city = searchBar.value;
    if (city) {
        const language = languageSelect.value;
        const units = unitSelect.value;
        const currentBackgroundClass = document.body.className;
        fetchWeather(city, language, units);
        document.body.className = currentBackgroundClass;
        }
    });

    unitSelect.addEventListener('change', () => {
        const city = searchBar.value;
        if (city) {
            const language = languageSelect.value;
            const units = unitSelect.value;
            fetchWeather(city, language, units);
        }
    });

    saveFavoriteButton.addEventListener('click', () => {
        const favoriteCity = searchBar.value;
        localStorage.setItem('favoriteCity', favoriteCity);
        alert('Favorite city saved!');
    });

    const favoriteCity = localStorage.getItem('favoriteCity');
    if (favoriteCity) {
        searchBar.value = favoriteCity;
        const language = languageSelect.value;
        const units = unitSelect.value;
        fetchWeather(favoriteCity, language, units);
    }

    if (searchBar.value) {
        const city = searchBar.value;
        const language = languageSelect.value;
        const units = unitSelect.value;
        fetchWeather(city, language, units);
    }

    updateTime();
});
