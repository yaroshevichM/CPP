var weaterData;

const COORDS = {
  lat: 49.234271,
  lng: 28.411304
}

async function initMap() {

  let map = new google.maps.Map(document.getElementById('map'), {
    center: COORDS,
    zoom: 8
  });

  await getWeather();

  let marker = new google.maps.Marker({
    position: COORDS,
    map: map,
    title: "VNTU",
    label: {
      text: weaterData.weather[0].main,
      color: "red",
    },
    title: weaterData.weather[0].description,
    icon: {
      url: `http://openweathermap.org/img/w/${weaterData.weather[0].icon}.png`,
      labelOrigin: new google.maps.Point(30, 40),
    },
  })
  console.log(weaterData);
}

async function getWeather() {
  await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${COORDS.lat}&lon=${COORDS.lng}&appid=1b5ee5a1a74d624a74750350327ea372`).then(async weaterResponse => {
    return weaterResponse.json()
  }).then(async weaterJson => {
    weaterData = weaterJson;
  }) 
}