let api;
$("#citybtn").click(function(){
    var cityName = $('#cityinput').val();
    api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=50bb7c5057118751036d4788c9617cfa&units=metric`;
    main();
    $("#cityform").addClass("hiddenform")
})
function main(){
    fetch(api)
    .then(Response => Response.json())
    .then(weather => {
        let localtime = (weather.dt *1000)+ weather.timezone;
        let date = new Date(localtime)
        console.log(date) 
        console.log(weather)
       let maindiv = $("#2pg")
        if(weather.cod == 404){
            maindiv.html(`
                <div>
                    <a class="mainfont m-0" style="color: black; font-size: 20px;" href="javascript:location.reload(true)"><i style="font-size: 17px;" class="fa-solid fa-arrow-left"></i> go back</a><br>
                    <h3 style="font-size: 35px;" class=" mainfont m-0">ERROR ${weather.cod}<br> ${weather.message}</h3>
                </div>
                `)
        }
        maindiv.html(`
            <div id="mianapp">
            <a class="mainfont m-0" style="color: black; font-size: 20px;" href="javascript:location.reload(true)"><i style="font-size: 17px;" class="fa-solid fa-arrow-left"></i> go back</a>
                <div class="uperpart d-flex flex-wrap">
                    <p class="date w-100 mainfont m-0"></p>
                    <h3 class="w-100 mainfont m-0">${weather.name}, ${weather.sys.country}</h3>
                    <div class="maininfo d-flex flex-wrap">
                        <div class="maininfo_1">
                            <h1 class="mainfont m-0">${Math.trunc(weather.main.temp)}C&#176;</h1>
                            <h6 class="mainfont m-0">Feels like ${Math.trunc(weather.main.feels_like)}C&#176;</h6>
                        </div>
                        <div class="maininfo_2">
                            <img src="images/${weather.weather[0].icon}.png" alt="" width="96px"  height="96px">
                        </div>
                        <h3 class="w-100 mainfont m-0">${weather.weather[0].description}.</h3>
                    </div>
                </div>
                <div class="lowerpart d-flex flex-wrap">
                    <div class="Ginfo mainfont">Visability: ${((weather.visibility)/1000).toFixed(1)}km</div>
                    <div class="Ginfo mainfont text-right">Wind: ${weather.wind.speed}m/s NMW</div>
                    <div class="Ginfo mainfont">Humidity: ${weather.main.humidity}%</div>
                    <div class="Ginfo mainfont text-right">Pressure: ${weather.main.pressure}hPa</div>
                    <div class="Ginfo mainfont">Clouds: ${weather.clouds.all}%</div>
                </div>
            </div>`)
    })
}  
