
//Get HTML Elements
let input = document.querySelector('.location-input')
let findBtn = document.querySelector('.find-btn')
let form = document.querySelector('form')
let row = document.querySelector('.weather-context')


//to Get Date
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];






form.addEventListener('submit', (e) => {
    
    e.preventDefault(false)
    getWeather(input.value)


})
findBtn.addEventListener('click', (e) => {

    getWeather(input.value)


})









//Get and Display Weather
async function getWeather(country) {


    try {
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b83c8745736e40d1a1c80250241306&q=${country}&days=3`);

        if (!res.ok) {

            throw new Error('Failed to get Weather' + ' ' + res.ok)
        }

        else {
            let data = await res.json()

            //Get Data

            let current = {

                locationName: data.location.name,
                Date: new Date(data.forecast.forecastday[0].date),
                Temp: data.current.temp_c,
                AirConditions: data.forecast.forecastday[0].day.condition.text,
                AirConditionIcon: data.forecast.forecastday[0].day.condition.icon,

                Humiditiy: data.current.humidity,
                Wind: data.current.wind_kph,
                WindDirection: data.current.wind_dir
            }

            let nextDay = {

                Date: new Date(data.forecast.forecastday[1].date),
                maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
                minTemp: data.forecast.forecastday[1].day.mintemp_c,
                AirConditions: data.forecast.forecastday[1].day.condition.text,
                AirConditionIcon: data.forecast.forecastday[1].day.condition.icon,
            }
            let thirdDay = {

                Date: new Date(data.forecast.forecastday[2].date),
                maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
                minTemp: data.forecast.forecastday[2].day.mintemp_c,
                AirConditions: data.forecast.forecastday[2].day.condition.text,
                AirConditionIcon: data.forecast.forecastday[2].day.condition.icon,
            }


            //Display Weather
            Display(current.locationName, days[current.Date.getDay()], current.Date.getDate(), months[current.Date.getDay()], current.Temp, current.AirConditions, current.AirConditionIcon, current.Humiditiy, current.Wind, current.WindDirection
                , days[nextDay.Date.getDay()], nextDay.maxTemp, nextDay.minTemp, nextDay.AirConditions, nextDay.AirConditionIcon,
                days[thirdDay.Date.getDay()], thirdDay.maxTemp, thirdDay.minTemp, thirdDay.AirConditions, thirdDay.AirConditionIcon)

            //Clear Inputs
            clear()





        }
    }
    catch (err) {
        console.error(err);
    }






}



//Display Weather
function Display(currLocation, currDay, currMonthDay, currDate, currTemp, currCond, currCondIcon, currHum, currWind, currDir, nextDay, nextDayMaxTemp, nextDayMinTemp, nextDayCond, nextDayCondIcon, thirdDay, thirdDayMaxTemp, thirdDayMinTemp, thirdDayCond, thirdDayCondIcon) {

    row.innerHTML = `   <div class="col-lg-4 p-0">
                        <div class="inner h-100">

                            <div class="weather-head d-flex justify-content-between bg-danger py-2 px-2">
                                <div class="day">
                                    ${currDay}
                                </div>
                                <div class="date">
                                ${currMonthDay + currDate}
                                </div>

                            </div>
                            <div class="weather-body bg-secondary px-3 py-5 h-100">
                                <div class="city">${currLocation}</div>
                                <div class="temp-one h1">
                                     ${currTemp}<sup>o</sup>C
                                </div>
                                <img src="https:${currCondIcon}" class="w-25" alt="">
                                <div class="day-sun text-info">
                                     ${currCond}
                                </div>
                                <span class="me-3">
                                    <img src="img/icon-umberella.png" alt="">
                                    <span> ${currHum}%</span>
                                </span>
                                <span class="me-3">
                                    <img src="img/icon-wind.png" alt="">
                                    <span> ${currWind}km/h</span>
                                </span>
                                <span>
                                    <img src="img/icon-compass.png" alt="">
                                    <span> ${currDir}</span>
                                </span>
                            </div>

                        </div>

                    </div>



                    <div class="col-lg-4 p-0">
                        <div class="inner h-100">

                            <div class="weather-head-two bg-dark d-flex justify-content-center bg-info py-2 px-2">
                                <div class="day">
                                ${nextDay}
                                </div>
                            </div>
                            <div
                                class="weather-body-two bg-dark px-3 d-flex flex-column align-items-center justify-content-center h-100">
                                <img src="https:${nextDayCondIcon}" class="mb-3" alt="">

                                <div class="max-temp-two h2 mb-0">
                                ${nextDayMaxTemp}<sup>o</sup>C
                                </div>
                                <div class="min-temp-two text-secondary mb-5">
                                ${nextDayMinTemp}<sup>o</sup>C
                                </div>
                                <div class="day-sun text-info">
                                ${nextDayCond}
                                </div>

                            </div>

                        </div>

                    </div>



                    <div class="col-lg-4 p-0">
                        <div class="inner h-100">

                            <div class="weather-head-three bg-black d-flex justify-content-center bg-info py-2 px-2">
                                <div class="day">
                                     ${thirdDay}
                                </div>
                            </div>
                            <div
                                class="weather-body-three bg-dark px-3 d-flex flex-column align-items-center justify-content-center h-100">
                                <img src="https:${thirdDayCondIcon}" class="mb-3" alt="">

                                <div class="max-temp-three h2 mb-0">
                                ${thirdDayMaxTemp}<sup>o</sup>C
                                </div>
                                <div class="min-temp-three text-secondary mb-5">
                                ${thirdDayMinTemp}<sup>o</sup>C
                                </div>
                                <div class="day-sun text-info">
                                ${thirdDayCond}
                                </div>

                            </div>

                        </div>

                    </div>`





}

//Clear Weather
function clear() {
    input.value = '';
}



window.addEventListener('load',()=>{

// Check if the browser supports the geolocation api
if (navigator.geolocation) {
    // Request the current position of the user
    navigator.geolocation.getCurrentPosition(function (position) {
        // Get the latitude and longitude from the position object
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        // Display the coordinates in the console
        getWeather(`${lat},${lon}`)
        //   console.log("Your coordinates are: " + lat + ", " + lon);
    });
} else {
    // If the browser does not support the geolocation api, display a message
    console.log("Geolocation is not supported by your browser");
}



})
