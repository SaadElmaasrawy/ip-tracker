let key = 'at_LIErGksTaJGe23vWhBL0DRTO8RJAY';
// search div
let ip = document.getElementById("search");

// infrmation div 

let infoIp = document.getElementById("info-ip");
let infoTimezone = document.getElementById("info-timezone");
let infoLocation = document.getElementById("info-location");
let infoIsp = document.getElementById("info-isp");
let infoCon = document.getElementById("info-con");

// map div 


function searching(){
    if(ip.value == ''){
        ip.placeholder = "input your IP please"
    }else{
        fetchFunc();
        infoCon.classList.remove("info-hidden");
        infoCon.offsetTop;

    }
}

function fetchFunc(){
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=${key}&ipAddress=${ip.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        infoIp.innerText = `${data.ip}`;
        infoLocation.innerText = `${data.location.region} , ${data.location.country}`;
        infoTimezone.innerText = `${data.location.timezone}`;
        infoIsp.innerText = `${data.isp}`;
        getLocation(data.ip);
    })

}




function getLocation(ip){
    const geoJsApiUrl = `https://get.geojs.io/v1/ip/geo/${ip}.json`;
    fetch(geoJsApiUrl)
    .then(response => response.json())
    .then(data => {
      const latitude = data.latitude;
      const longitude = data.longitude;
  
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      var map = L.map('map').setView([latitude, longitude], 13);


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([latitude, longitude]).addTo(map);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
}

